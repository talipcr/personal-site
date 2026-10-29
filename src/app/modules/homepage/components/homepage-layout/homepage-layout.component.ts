import { AfterViewInit, Component, ElementRef, Input, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { inView } from 'motion';
import { duration, enter } from 'src/app/shared/motion/motion.tokens';

@Component({
  selector: 'app-homepage-layout',
  templateUrl: './homepage-layout.component.html',
  styleUrls: ['./homepage-layout.component.scss'],
})
export class HomepageLayoutComponent implements AfterViewInit, OnDestroy {
  @Input() title: string = '';
  @Input() anchor: string = '';

  @ViewChild('stroke', { static: true }) private strokeRef!: ElementRef<HTMLElement>;
  private stopInView?: VoidFunction;

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    const stroke = this.strokeRef.nativeElement;
    stroke.style.opacity = '0';
    // Gradient stroke under the title draws itself from the left
    this.zone.runOutsideAngular(() => {
      this.stopInView = inView(
        stroke,
        () => void enter(stroke, { opacity: [0, 1], scaleX: [0, 1] }, { duration: duration.slow, delay: 0.1 }),
        { amount: 0.3 }
      );
    });
  }

  ngOnDestroy(): void {
    this.stopInView?.();
  }
}
