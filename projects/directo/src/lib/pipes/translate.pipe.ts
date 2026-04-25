import { Pipe, PipeTransform, inject } from '@angular/core';
import { DirectoService } from '../services/directo.service';

/**
 * Standard Translation Pipe for Static UI Strings.
 * Retrieves translations from the current or specified language dictionary.
 * Supports nested dot-notation (e.g., 'AUTH.LOGIN.TITLE').
 * 
 * @usageNotes
 * ```html
 * <!-- Standard -->
 * <h2>{{ 'COMMON.WELCOME' | directoTranslate }}</h2>
 * 
 * <!-- With Interpolation ({ name: 'Ahmad' }) -->
 * <span>{{ 'AUTH.GREET' | directoTranslate : { name: 'Ahmad' } }}</span>
 * 
 * <!-- Forced language -->
 * <span>{{ 'AUTH.LOGIN' | directoTranslate : 'ar' }}</span>
 * 
 * <!-- Interpolation + Forced language -->
 * <span>{{ 'AUTH.GREET' | directoTranslate : { name: 'Ahmad' } : 'ar' }}</span>
 * ```
 */
@Pipe({
  name: 'directoTranslate',
  standalone: true,
  pure: false // Allows reacting to language changes via the service signal
})
export class DirectoTranslatePipe implements PipeTransform {
  private directo = inject(DirectoService);

  /**
   * Transforms the key into a translated string.
   * 
   * @param key The translation key
   * @param paramsOrLang Optional interpolation parameters OR language code
   * @param lang Optional language code if parameters were provided as the second argument
   */
  transform(key: string, paramsOrLang?: { [key: string]: any } | string, lang?: string): string {
    if (!key) return '';

    // Handle flexible overloads:
    // 1. transform(key, 'ar') -> params=undefined, lang='ar'
    // 2. transform(key, { name: '..' }) -> params={..}, lang=undefined
    // 3. transform(key, { name: '..' }, 'ar') -> params={..}, lang='ar'
    
    if (typeof paramsOrLang === 'string') {
      return this.directo.translate(key, undefined, paramsOrLang);
    }

    return this.directo.translate(key, paramsOrLang, lang);
  }
}
