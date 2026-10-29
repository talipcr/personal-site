import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { animate, scroll } from 'motion';
import { experienceData } from 'src/app/shared/mock/data';
import { prefersReducedMotion, springSoft, springUi } from 'src/app/shared/motion/motion.tokens';

@Component({
  selector: 'app-homepage-experience',
  templateUrl: './homepage-experience.component.html',
  styleUrls: ['./homepage-experience.component.scss'],
})
export class HomepageExperienceComponent implements AfterViewInit, OnDestroy {
  experienceData = experienceData;

  @ViewChild('timeline') private timelineRef?: ElementRef<HTMLElement>;
  @ViewChild('fill') private fillRef?: ElementRef<HTMLElement>;
  private stopScroll?: VoidFunction;

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    const timeline = this.timelineRef?.nativeElement;
    const fill = this.fillRef?.nativeElement;
    if (!timeline || !fill) return;
    const nodes = Array.from(timeline.querySelectorAll<HTMLElement>('.timeline-node'));

    if (prefersReducedMotion()) {
      fill.style.transform = 'none';
      nodes.forEach((node) => node.classList.add('is-lit'));
      return;
    }

    const lit = new Set<HTMLElement>();
    this.zone.runOutsideAngular(() => {
      this.stopScroll = scroll(
        (progress: number) => {
          // Spring-smoothed fill following scroll progress
          animate(fill, { scaleY: progress }, springSoft);

          const reached = progress * timeline.offsetHeight;
          nodes.forEach((node) => {
            const top = (node.parentElement?.offsetTop ?? 0) + node.offsetTop;
            const on = top <= reached;
            if (on === lit.has(node)) return;
            if (on) lit.add(node);
            else lit.delete(node);
            animate(node, on ? { opacity: 1, scale: 1 } : { opacity: 0.35, scale: 0.6 }, springUi);
          });
        },
        { target: timeline, offset: ['start 70%', 'end 70%'] }
      );
    });
  }

  ngOnDestroy(): void {
    this.stopScroll?.();
  }
}
