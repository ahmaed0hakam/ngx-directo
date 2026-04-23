import { Directive, ElementRef, inject, effect, input } from '@angular/core';
import { DirectoService } from '../services/directo.service';

/**
 * Conditional Visibility Directive based on Direction.
 * Shows or hides the host element depending on whether the app is in RTL or LTR mode.
 * Optimized for clean attribute usage and high performance via Angular Signals.
 * 
 * @author Ahmad Alhafi
 * @usageNotes
 * ```html
 * <div dirOnly="rtl">This appears ONLY in Arabic</div>
 * <div dirOnly="ltr">This appears ONLY in English</div>
 * ```
 */
@Directive({
  selector: '[dirOnly]',
  standalone: true
})
export class DirOnlyDirective {
  /** The direction target for which this element should be visible. (Signal Input) */
  targetDir = input<'rtl' | 'ltr'>('rtl', { alias: 'dirOnly' });
  
  private el = inject(ElementRef);
  private directo = inject(DirectoService);

  constructor() {
    // Reactive effect: Re-evaluates visibility whenever either the app direction 
    // OR the targetDir input signal changes.
    effect(() => {
      const isRtl = this.directo.isRtl();
      const target = this.targetDir();
      const shouldShow = (target === 'rtl' && isRtl) || 
                         (target === 'ltr' && !isRtl);
      
      this.el.nativeElement.style.display = shouldShow ? '' : 'none';
      
      // Accessibility update: ensure hidden elements are ignored by screen readers
      if (shouldShow) {
        this.el.nativeElement.removeAttribute('aria-hidden');
      } else {
        this.el.nativeElement.setAttribute('aria-hidden', 'true');
      }
    });
  }
}
