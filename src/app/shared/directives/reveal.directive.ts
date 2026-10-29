import { AfterViewInit, Directive, ElementRef, Input, NgZone, OnDestroy } from '@angular/core';
import { inView } from 'motion';
import { enter, fadeUp } from '../motion/motion.tokens';

// fadeUp when 30% of the element is in view (once). Value = stagger index.
@Directive({
  selector: '[appReveal]',
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  @Input() appReveal: number | '' = 0;

  private stopInView?: VoidFunction;

  constructor(private el: ElementRef<HTMLElement>, private zone: NgZone) {}

  ngAfterViewInit(): void {
    const el = this.el.nativeElement;
    const delay = Math.min(Number(this.appReveal) || 0, 5) * 0.08;

    // Hidden by JS right before observing: content stays visible if Motion fails
    el.style.opacity = '0';
    this.zone.runOutsideAngular(() => {
      this.stopInView = inView(el, () => void enter(el, fadeUp, { delay }), { amount: 0.3 });
    });
  }

  ngOnDestroy(): void {
    this.stopInView?.();
  }
}
