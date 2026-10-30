import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { animate, scroll } from 'motion';
import { TranslateService } from '@ngx-translate/core';
import { experienceData } from 'src/app/shared/mock/data';
import { isBrowser, prefersReducedMotion, springSoft, springUi } from 'src/app/shared/motion/motion.tokens';

type Company = (typeof experienceData)[number];
type Position = Company['positions'][number];

@Component({
  selector: 'app-homepage-experience',
  templateUrl: './homepage-experience.component.html',
  styleUrls: ['./homepage-experience.component.scss'],
})
export class HomepageExperienceComponent implements AfterViewInit, OnDestroy {
  experienceData = experienceData;
  selected?: { company: Company; position: Position };

  @ViewChild('timeline') private timelineRef?: ElementRef<HTMLElement>;
  @ViewChild('fill') private fillRef?: ElementRef<HTMLElement>;
  @ViewChild('dialog') private dialogRef?: ElementRef<HTMLDialogElement>;
  private stopScroll?: VoidFunction;
  private today = new Date();

  constructor(private zone: NgZone, private translate: TranslateService) {}

  open(company: Company, position: Position): void {
    this.selected = { company, position };
    this.dialogRef?.nativeElement.showModal();
  }

  closeOnBackdrop(event: MouseEvent): void {
    // Clicks on the dialog box itself (not its content) come from the backdrop
    if (event.target === this.dialogRef?.nativeElement) this.dialogRef.nativeElement.close();
  }

  /** Counts first and last month, like LinkedIn. Data months are 1-based, today's getMonth() is 0-based. */
  duration(start: Date, end?: Date): string {
    const endYear = end ? end.getFullYear() : this.today.getFullYear();
    const endMonth = end ? end.getMonth() : this.today.getMonth() + 1;
    const total = (endYear - start.getFullYear()) * 12 + endMonth - start.getMonth() + 1;
    const years = Math.floor(total / 12);
    const months = total % 12;

    const label = (n: number, one: string, many: string) =>
      `${n} ${this.translate.instant(n > 1 ? many : one)}`;
    const parts = [
      years > 0 ? label(years, 'DURATION.YEAR', 'DURATION.YEARS') : '',
      months > 0 ? label(months, 'DURATION.MONTH', 'DURATION.MONTHS') : '',
    ];
    return parts.filter(Boolean).join(' ');
  }

  ngAfterViewInit(): void {
    if (!isBrowser) return;
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
