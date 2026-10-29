import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-summary-item',
  templateUrl: './summary-item.component.html',
  styleUrls: ['./summary-item.component.scss'],
})
export class SummaryItemComponent {
  @Input() item: any;
  @Input() sameCompany : boolean = false;
  @Input() type: any;

  public today: Date = new Date();

  constructor(private translate: TranslateService) {}

  public isList(value: unknown): value is string[] {
    return Array.isArray(value);
  }

  public calculateDiff(startDate: Date, endDate: Date): string {
    const start = new Date(startDate.getFullYear(), startDate.getMonth() - 1);
    const end = endDate
      ? new Date(endDate.getFullYear(), endDate.getMonth())
      : new Date(this.today.getFullYear(), this.today.getMonth());

    const diffInMs = Math.abs(end.getTime() - start.getTime());
    const diffInMonths = Math.floor(
      (diffInMs / (1000 * 60 * 60 * 24 * 30)) % 12
    );
    const years = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30) / 12);

    const yearsLabel = `${years} ${this.translate.instant(
      years > 1 ? 'DURATION.YEARS' : 'DURATION.YEAR'
    )}`;
    const monthsLabel = `${diffInMonths} ${this.translate.instant(
      diffInMonths > 1 ? 'DURATION.MONTHS' : 'DURATION.MONTH'
    )}`;

    return years > 0 && diffInMonths > 0
      ? `${yearsLabel} ${monthsLabel}`
      : years > 0
      ? yearsLabel
      : monthsLabel;
  }
}
