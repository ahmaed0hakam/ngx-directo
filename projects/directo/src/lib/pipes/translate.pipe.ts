import { Pipe, PipeTransform, inject } from '@angular/core';
import { DirectoService } from '../services/directo.service';

/**
 * Standard Translation Pipe for Static UI Strings.
 * Retrieves translations from the current or specified language dictionary.
 * Supports nested dot-notation (e.g., 'AUTH.LOGIN.TITLE').
 * 
 * @usageNotes
 * ```html
 * <!-- Use current language -->
 * <h2>{{ 'COMMON.WELCOME' | directoTranslate }}</h2>
 * 
 * <!-- Force a specific language -->
 * <span>{{ 'AUTH.LOGIN' | directoTranslate : 'ar' }}</span>
 * ```
 */
@Pipe({
  name: 'directoTranslate',
  standalone: true,
  pure: false // Allows reacting to language changes via the service signal
})
export class DirectoTranslatePipe implements PipeTransform {
  private directo = inject(DirectoService);

  transform(key: string, lang?: string): string {
    if (!key) return '';
    return this.directo.translate(key, lang);
  }
}
