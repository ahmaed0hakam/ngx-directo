import { Pipe, PipeTransform, inject } from '@angular/core';
import { DirectoService } from '../services/directo.service';

/**
 * Universal Localization Pipe.
 * Dynamically resolves values based on the active language.
 * 
 * Capability 1: Value Selection (Explicit)
 *   {{ item.nameEn | localize : item.nameAr }}
 * 
 * Capability 2: Object Mapping (Dynamic Keys)
 *   {{ item | localize : { en: 'title_en', ar: 'title_ar' } }}
 * 
 * Capability 3: Key Guessing (Fallback)
 *   {{ item | localize : 'name' }} -> looks for nameEn/nameAr
 * 
 * @author Ahmad Alhafi
 */
@Pipe({
  name: 'localize',
  standalone: true,
  pure: false
})
export class LocalizePipe implements PipeTransform {
  private directo = inject(DirectoService);

  transform(value: any, ...args: any[]): any {
    const lang = this.directo.currentLang();

    // Strategy 1: Explicit Values (en | localize : ar : fr)
    // We assume the order matches the language configuration order or 
    // simply use the first arg as 'ar' for convenience in common en/ar apps.
    if (typeof value === 'string' && args.length > 0) {
       // Simple EN/AR logic matching core-health but extensible
       if (lang === 'ar') return args[0] || value;
       return value;
    }

    // Strategy 2: Map of Keys
    if (args.length === 1 && typeof args[0] === 'object') {
       const keyMap = args[0];
       const targetKey = keyMap[lang];
       return value[targetKey] || value[keyMap['en']] || '';
    }

    // Strategy 3: Automatic Key Guessing (The 'Directo' Way)
    if (typeof args[0] === 'string') {
        const baseKey = args[0];
        const suffix = lang.charAt(0).toUpperCase() + lang.slice(1);
        const localizedKey = `${baseKey}${suffix}`;
        return value[localizedKey] || value[baseKey] || '';
    }

    return value || '';
  }
}
