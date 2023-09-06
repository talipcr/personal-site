import { Component, Input } from '@angular/core';

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

    return Math.round(years) > 0 && Math.round(diffInMonths) > 0
      ? `${Math.round(years)} years ${Math.round(diffInMonths)} months`
      : Math.round(years) > 0
      ? `${Math.round(years)} years`
      : `${Math.round(diffInMonths)} months`;
  }
}
