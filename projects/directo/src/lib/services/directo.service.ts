import { Injectable, signal, computed, effect, inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { DIRECTO_CONFIG, DirectoConfig } from '../models/directo.config';

/**
 * The core service for managing application directionality, language state, and font orchestration.
 * Powering the Directo SDK by Ahmad Alhafi.
 * 
 * @example
 * ```typescript
 * const directo = inject(DirectoService);
 * directo.setLanguage('ar');
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class DirectoService {
  /** Reactive config state allowing runtime updates for translations */
  private readonly configSignal = signal<DirectoConfig>(inject(DIRECTO_CONFIG));
  
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly defaultStorageKey = 'directo_lang';
  private readonly isBrowser: boolean;

  // State Signals
  readonly currentLang = signal<string>(this.configSignal().defaultLang);

  // Computed Signals
  readonly currentConfig = computed(() => this.configSignal().languages[this.currentLang()]);
  readonly isRtl = computed(() => this.currentConfig()?.direction === 'rtl');
  readonly startSide = computed(() => this.isRtl() ? 'right' : 'left');
  readonly endSide = computed(() => this.isRtl() ? 'left' : 'right');

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      const config = this.configSignal();
      const savedLang = localStorage.getItem(config.storageKey || this.defaultStorageKey);
      if (savedLang && config.languages[savedLang]) {
        this.currentLang.set(savedLang);
      }
    }

    // Reaction: Sync state to DOM and Persistence
    effect(() => {
      const lang = this.currentLang();
      const config = this.currentConfig();
      const isRtl = this.isRtl();
      const storageKey = this.configSignal().storageKey || this.defaultStorageKey;

      if (!config) return;

      // Update DOM
      this.document.documentElement.dir = config.direction;
      this.document.documentElement.lang = lang;
      this.document.body.style.setProperty('--directo-font-family', config.fontFamily);

      // 5. Update global CSS variables for native animations
      const root = this.document.documentElement;
      root.style.setProperty('--dir-sign', isRtl ? '-1' : '1');
      root.style.setProperty('--dir-align', isRtl ? 'right' : 'left');
      root.style.setProperty('--dir-align-inv', isRtl ? 'left' : 'right');

      // Persist
      if (this.isBrowser) {
        localStorage.setItem(storageKey, lang);
      }

      // Font Injection
      if (config.googleFontName) {
        this.injectGoogleFont(config.googleFontName);
      }

      // Third-party sync
      this.syncWithThirdParty();
    });
  }

  /**
   * Update the current language
   * @param langCode The language code to switch to
   */
  setLanguage(langCode: string): void {
    if (this.configSignal().languages[langCode]) {
      this.currentLang.set(langCode);
    } else {
      console.warn(`[Directo] Language code "${langCode}" not found in configuration.`);
    }
  }

  /**
   * Sync directionality with third-party libraries (Material, Ionic)
   */
  syncWithThirdParty(): void {
    const direction = this.currentConfig().direction;

    // Ionic Bridge (Dynamic Check)
    const win = window as any;
    if (win.Ionic?.config) {
      win.Ionic.config.set('mode', direction === 'rtl' ? 'md' : win.Ionic.config.get('mode')); // Example logic
    }
  }

  /**
   * Dynamically updates the translation dictionary for a specific language.
   * Useful for loading external JSON files (e.g., ar.json) at runtime.
   * 
   * @param lang The language key (e.g., 'ar')
   * @param translations The translation object fetched from a JSON file or API
   */
  setTranslations(lang: string, translations: { [key: string]: any }) {
    this.configSignal.update(current => {
      if (!current.languages[lang]) return current;
      
      return {
        ...current,
        languages: {
          ...current.languages,
          [lang]: {
            ...current.languages[lang],
            translations
          }
        }
      };
    });
  }

  private injectGoogleFont(fontName: string): void {
    if (!this.isBrowser) return;

    const fontId = `directo-font-${fontName.replace(/\s+/g, '-').toLowerCase()}`;
    if (this.document.getElementById(fontId)) return;

    const link = this.document.createElement('link');
    link.id = fontId;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, '+')}:wght@300;400;500;700&display=swap`;

    this.document.head.appendChild(link);
  }

  /**
   * Translates a static key based on the language configuration.
   * Supports nested keys via dot notation (e.g. 'HOME.WELCOME')
   * 
   * @param key The translation key to look up
   * @param lang (Optional) Force a specific language dictionary (e.g. 'ar')
   * @returns The translated string or the original key if not found
   */
  translate(key: string, lang?: string): string {
    const config = lang 
      ? this.configSignal().languages[lang] 
      : this.currentConfig();
      
    if (!config || !config.translations) return key;

    const keys = key.split('.');
    let result: any = config.translations;

    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        return key; // Fallback to key if not found
      }
    }

    return typeof result === 'string' ? result : key;
  }
}
