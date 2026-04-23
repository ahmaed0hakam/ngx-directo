import { Pipe, PipeTransform, inject } from '@angular/core';
import { DirectoService } from '../services/directo.service';

/**
 * Native Arabic Digit Transformation Pipe.
 * Converts Western digits (0-9) into Eastern Arabic digits (٠-٩) based on configuration.
 * Only transforms if 'useNativeDigits' is enabled for the current language.
 * 
 * @author Ahmad Alhafi
 * @usageNotes
 * ```html
 * <span>{{ 2026 | dirNumber }}</span>
 * <!-- Results in ٢٠٢٦ in Arabic mode -->
 * ```
 */
@Pipe({
  name: 'dirNumber',
  standalone: true,
  pure: false
})
export class DirNumberPipe implements PipeTransform {
  private directo = inject(DirectoService);

  transform(value: number | string | null | undefined): string {
    if (value === null || value === undefined) return '';
    
    const strValue = value.toString();
    const config = this.directo.currentConfig();
    
    if (!config?.localizeDigits) return strValue;

    const nativeDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return strValue.replace(/[0-9]/g, (w) => nativeDigits[+w]);
  }
}
