import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { animate } from 'motion';
import { canHover, isBrowser, springSoft } from '../../motion/motion.tokens';

// Site palette by default (see :root in styles.scss)
const DEFAULT_COLORS = ['var(--hb-c1)', 'var(--hb-c2)', 'var(--hb-c3)', 'var(--hb-c4)'];

// Max parallax offset of the dot grid, in px
const PARALLAX = 14;

const FRAGMENTS = [
  { text: 'async Task', left: 6, top: 88 },
  { text: 'public record', left: 70, top: 62 },
  { text: '=>', left: 38, top: 96 },
  { text: 'IEnumerable<T>', left: 82, top: 92 },
  { text: '[ApiController]', left: 52, top: 74 },
  { text: 'dotnet run', left: 20, top: 66 },
];

/**
 * Animated hero backdrop: drifting blobs, dot grid with pointer parallax,
 * optional rising code fragments, vignette + grain.
 * Loops are CSS keyframes on transform/opacity (compositor only);
 * they pause when the tab is hidden or the hero leaves the viewport.
 */
@Component({
  selector: 'app-hero-background',
  template: `
    <div class="hb-blobs">
      <span *ngFor="let color of blobColors" class="hb-blob" [style.background]="color"></span>
    </div>
    <div #grid class="hb-grid"></div>
    <div *ngIf="showCodeFragments" class="hb-code font-mono">
      <span
        *ngFor="let fragment of fragments; let i = index"
        class="hb-fragment"
        [style.left.%]="fragment.left"
        [style.top.%]="fragment.top"
        [style.animation-delay.s]="-i * 3.7"
        >{{ fragment.text }}</span
      >
    </div>
    <div class="hb-vignette"></div>
  `,
  styleUrls: ['./hero-background.component.scss'],
})
export class HeroBackgroundComponent implements AfterViewInit, OnDestroy {
  @Input() intensity: 'subtle' | 'normal' = 'normal';
  @Input() showCodeFragments = false;
  @Input() colors?: string[];
  /** Pointer parallax on the dot grid (desktop, fine pointer only) */
  @Input() interactive = true;

  @HostBinding('attr.aria-hidden') readonly ariaHidden = 'true';

  @HostBinding('class.is-subtle') get subtle(): boolean {
    return this.intensity === 'subtle';
  }

  @ViewChild('grid', { static: true }) private gridRef!: ElementRef<HTMLElement>;

  fragments = FRAGMENTS;
  private observer?: IntersectionObserver;
  private inViewport = true;
  private motionQuery?: MediaQueryList;

  constructor(private zone: NgZone, private host: ElementRef<HTMLElement>) {}

  get blobColors(): string[] {
    const colors = this.colors?.length ? this.colors : DEFAULT_COLORS;
    return DEFAULT_COLORS.map((_, i) => colors[i % colors.length]);
  }

  ngAfterViewInit(): void {
    if (!isBrowser) return;
    this.motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Outside Angular: pointer and visibility events never trigger change detection
    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(([entry]) => {
        this.inViewport = entry.isIntersecting;
        this.updatePaused();
      });
      this.observer.observe(this.host.nativeElement);
      document.addEventListener('visibilitychange', this.updatePaused);
      if (this.interactive) {
        window.addEventListener('pointermove', this.onPointerMove, { passive: true });
      }
    });
  }

  ngOnDestroy(): void {
    if (!isBrowser) return;
    this.observer?.disconnect();
    document.removeEventListener('visibilitychange', this.updatePaused);
    window.removeEventListener('pointermove', this.onPointerMove);
  }

  private get paused(): boolean {
    return document.hidden || !this.inViewport;
  }

  private updatePaused = (): void => {
    this.host.nativeElement.classList.toggle('is-paused', this.paused);
  };

  private onPointerMove = (event: PointerEvent): void => {
    if (this.paused || this.motionQuery?.matches || window.innerWidth < 768 || !canHover()) return;
    // Grid moves against the pointer, spring-smoothed
    const x = (0.5 - event.clientX / window.innerWidth) * 2 * PARALLAX;
    const y = (0.5 - event.clientY / window.innerHeight) * 2 * PARALLAX;
    animate(this.gridRef.nativeElement, { x, y }, springSoft);
  };
}
