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

    const keys = Object.keys(replacements);
    const pattern = new RegExp(`\\b(${keys.join('|')})\\b|(${keys.join('|')})`, 'g');
    
    return value.replace(pattern, (matched) => {
      const lower = matched.toLowerCase();
      return replacements[lower] || matched;
    });
  }
}
