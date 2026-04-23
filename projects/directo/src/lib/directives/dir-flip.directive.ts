import { Directive, ElementRef, inject, effect } from '@angular/core';
import { DirectoService } from '../services/directo.service';

/**
 * Directional Mirroring Directive.
 * Automatically flips elements (icons, illustrations) in RTL mode using a scaleX(-1) transformation.
 * 
 * @author Ahmad Alhafi
 * @usageNotes
 * ```html
 * <i dirFlip class="pi pi-arrow-right"></i>
 * <!-- The arrow will point left in Arabic mode -->
 * ```
 */
@Directive({
  selector: '[dirFlip]',
  standalone: true
})
export class DirFlipDirective {
  private el = inject(ElementRef);
  private directo = inject(DirectoService);

  constructor() {
    effect(() => {
      const isRtl = this.directo.isRtl();
      this.el.nativeElement.style.transform = isRtl ? 'scaleX(-1)' : 'none';
      this.el.nativeElement.style.display = 'inline-block';
    });
  }
}
