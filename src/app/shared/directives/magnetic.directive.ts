import { AfterViewInit, Directive, ElementRef, Input, NgZone, OnDestroy } from '@angular/core';
import { animate } from 'motion';
import { canHover, prefersReducedMotion, springUi } from '../motion/motion.tokens';

// Pulls the element toward the pointer when it comes within `magneticRadius` px.
@Directive({
  selector: '[appMagnetic]',
})
export class MagneticDirective implements AfterViewInit, OnDestroy {
  @Input() magneticRadius = 60;
  @Input() magneticStrength = 0.3;

  private removeListener?: VoidFunction;

  constructor(private el: ElementRef<HTMLElement>, private zone: NgZone) {}

  ngAfterViewInit(): void {
    if (!canHover() || prefersReducedMotion()) return;

    const el = this.el.nativeElement;
    let attracted = false;

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const near =
        Math.abs(dx) < rect.width / 2 + this.magneticRadius &&
        Math.abs(dy) < rect.height / 2 + this.magneticRadius;

      if (near) {
        attracted = true;
        animate(el, { x: dx * this.magneticStrength, y: dy * this.magneticStrength }, springUi);
      } else if (attracted) {
        attracted = false;
        animate(el, { x: 0, y: 0 }, springUi);
      }
    };

    this.zone.runOutsideAngular(() =>
      window.addEventListener('pointermove', onMove, { passive: true })
    );
    this.removeListener = () => window.removeEventListener('pointermove', onMove);
  }

  ngOnDestroy(): void {
    this.removeListener?.();
  }
}
