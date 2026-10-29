import { AfterViewInit, Directive, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { animate, hover } from 'motion';
import { canHover, prefersReducedMotion, springUi } from '../motion/motion.tokens';

// Small spring lift on hover (stack tags).
@Directive({
  selector: '[appFloat]',
})
export class FloatDirective implements AfterViewInit, OnDestroy {
  private stopHover?: VoidFunction;

  constructor(private el: ElementRef<HTMLElement>, private zone: NgZone) {}

  ngAfterViewInit(): void {
    if (!canHover() || prefersReducedMotion()) return;
    const el = this.el.nativeElement;
    this.zone.runOutsideAngular(() => {
      this.stopHover = hover(el, () => {
        animate(el, { y: -3 }, springUi);
        return () => animate(el, { y: 0 }, springUi);
      });
    });
  }

  ngOnDestroy(): void {
    this.stopHover?.();
  }
}
