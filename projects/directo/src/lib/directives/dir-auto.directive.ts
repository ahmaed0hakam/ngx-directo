import { Directive, ElementRef, inject, OnDestroy, AfterViewInit, input, effect } from '@angular/core';

/**
 * Smart Directionality Detection Directive.
 * Automatically sets dir="rtl" or dir="ltr" based on the first strong character of the content.
 * Ideal for chat bubbles, comments, and user-generated content.
 * 
 * @author Ahmad Alhafi
 * @usageNotes
 * ```html
 * <p [dirAuto]="commentText">{{ commentText }}</p>
 * <!-- OR Use as a bare attribute to scan inner content -->
 * <p dirAuto>{{ dynamicContent }}</p>
 * ```
 */
@Directive({
  selector: '[dirAuto]',
  standalone: true
})
export class DirAutoDirective implements AfterViewInit, OnDestroy {
  /** Optional input value to detect from. If not provided, it scans the inner text. */
  value = input<string | null | undefined>(undefined, { alias: 'dirAuto' });
  
  private el = inject(ElementRef);
  private observer?: MutationObserver;
  private readonly rtlRegex = /[\u0590-\u08FF\uFB1D-\uFDFF\uFE70-\uFEFE]/;

  constructor() {
    // Automatically re-detect direction whenever the input signal changes
    effect(() => {
      this.updateDirection();
    });
  }

  ngAfterViewInit() {
    this.updateDirection();

    // Watch for dynamic content changes
    this.observer = new MutationObserver(() => this.updateDirection());
    this.observer.observe(this.el.nativeElement, {
      childList: true,
      characterData: true,
      subtree: true
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  private updateDirection() {
    const val = this.value();
    const text = val !== null && val !== undefined
      ? val
      : this.el.nativeElement.innerText;

    const direction = this.detectDirection(text);
    this.el.nativeElement.setAttribute('dir', direction);
  }

  private detectDirection(text: string): 'rtl' | 'ltr' {
    if (!text) return 'ltr';
    const trimmed = text.trim();
    for (let i = 0; i < trimmed.length; i++) {
      const char = trimmed[i];
      // Skip numbers and common punctuation at the start
      if (/[0-9\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(char)) continue;
      return this.rtlRegex.test(char) ? 'rtl' : 'ltr';
    }
    return 'ltr';
  }
}
