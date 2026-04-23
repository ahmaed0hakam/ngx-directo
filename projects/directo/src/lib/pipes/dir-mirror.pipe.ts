import { Pipe, PipeTransform, inject } from '@angular/core';
import { DirectoService } from '../services/directo.service';

/**
 * String Asset Mirroring Pipe.
 * Replaces directional keywords in strings (e.g., 'right' to 'left') based on the current direction.
 * Ideal for icon class names and dynamic file paths.
 * 
 * @author Ahmad Alhafi
 * @usageNotes
 * ```html
 * <i [class]="'pi pi-chevron-' + ('right' | dirMirror)"></i>
 * <!-- In RTL mode, this results in 'pi pi-chevron-left' -->
 * ```
 */
@Pipe({
  name: 'dirMirror',
  standalone: true,
  pure: false
})
export class DirMirrorPipe implements PipeTransform {
  private directo = inject(DirectoService);

  transform(value: string): string {
    if (!value || !this.directo.isRtl()) return value;

    const replacements: { [key: string]: string } = {
      'right': 'left',
      'left': 'right',
      'next': 'prev',
      'prev': 'next',
      'forward': 'backward',
      'backward': 'forward',
      'start': 'end',
      'end': 'start'
    };

    let result = value.toLowerCase();
    Object.keys(replacements).forEach(key => {
      if (result.includes(key)) {
        // Simple swap logic
        result = result.replace(key, replacements[key]);
      }
    });

    return result;
  }
}
