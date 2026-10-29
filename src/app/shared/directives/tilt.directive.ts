import { AfterViewInit, Directive, ElementRef, NgZone, OnDestroy, Renderer2 } from '@angular/core';
import { animate, hover, press } from 'motion';
import { canHover, duration, prefersReducedMotion, springUi } from '../motion/motion.tokens';

const MAX_TILT = 4; // degrees

// Card hover: lift, 3D tilt toward the pointer, violet glow following the cursor, tap scale.
@Directive({
  selector: '[appTilt]',
})
export class TiltDirective implements AfterViewInit, OnDestroy {
  private cleanups: VoidFunction[] = [];

  constructor(
    private el: ElementRef<HTMLElement>,
    private zone: NgZone,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    if (!canHover() || prefersReducedMotion()) return;

    const card = this.el.nativeElement;
    const glow: HTMLElement = this.renderer.createElement('span');
    this.renderer.addClass(glow, 'card-glow');
    this.renderer.setAttribute(glow, 'aria-hidden', 'true');
    this.renderer.insertBefore(card, glow, card.firstChild);

    this.zone.runOutsideAngular(() => {
      animate(card, { transformPerspective: 800 }, { duration: 0 });

      const onMove = (event: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        animate(
          card,
          {
            rotateX: (0.5 - y / rect.height) * 2 * MAX_TILT,
            rotateY: (x / rect.width - 0.5) * 2 * MAX_TILT,
          },
          springUi
        );
        animate(glow, { x, y }, springUi);
      };

      this.cleanups.push(
        hover(card, () => {
          card.style.willChange = 'transform';
          card.addEventListener('pointermove', onMove, { passive: true });
          animate(card, { y: -4 }, springUi);
          animate(glow, { opacity: 1 }, { duration: duration.fast });

          return () => {
            card.removeEventListener('pointermove', onMove);
            animate(card, { y: 0, rotateX: 0, rotateY: 0 }, springUi).then(
              () => (card.style.willChange = '')
            );
            animate(glow, { opacity: 0 }, { duration: duration.fast });
          };
        }),
        press(card, () => {
          animate(card, { scale: 0.98 }, springUi);
          return () => animate(card, { scale: 1 }, springUi);
        }),
        () => card.removeEventListener('pointermove', onMove)
      );
    });
  }

  ngOnDestroy(): void {
    this.cleanups.forEach((cleanup) => cleanup());
  }
}
