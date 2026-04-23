import { Directive, ElementRef, inject } from '@angular/core';

/**
 * LTR-Lock Directive for Inputs.
 * Forces an input or element to remain LTR regardless of the global application direction.
 * Critical for Phone numbers, IBANs, Emails, and Password fields.
 * 
 * @author Ahmad Alhafi
 * @usageNotes
 * ```html
 * <input type="tel" dirInput placeholder="+966 --- --- ---">
 * ```
 */
@Directive({
  selector: '[dirInput]',
  standalone: true
})
export class DirInputDirective {
  private el = inject(ElementRef);

  constructor() {
    this.el.nativeElement.setAttribute('dir', 'ltr');
    this.el.nativeElement.style.textAlign = 'left';
  }
}
