import { InjectionToken } from '@angular/core';

/**
 * Configuration for a single language in the Directo system.
 * Powering the Directo SDK by Ahmad Alhafi.
 */
export interface LanguageConfig {
  /** Text direction: 'rtl' for Arabic or 'ltr' for English */
  direction: 'rtl' | 'ltr';

  /** The CSS font secondary stack or specific web font (e.g., "'Cairo', sans-serif") */
  fontFamily: string;

  /** (Optional) Name of the Google Font to automatically load in the document head */
  googleFontName?: string;

  /** (Optional) If enabled, allows the dirNumber pipe to transform Western digits 0-9 into native Arabic digits ٠-٩ */
  localizeDigits?: boolean;

  /** (Optional) Translation dictionary for static UI strings used by the perfectoTranslate pipe */
  translations?: { [key: string]: any };
}

export interface DirectoConfig {
  languages: { [langCode: string]: LanguageConfig };
  defaultLang: string;
  storageKey?: string; // Defaults to 'directo_lang'
}

export const DIRECTO_CONFIG = new InjectionToken<DirectoConfig>('DIRECTO_CONFIG');
