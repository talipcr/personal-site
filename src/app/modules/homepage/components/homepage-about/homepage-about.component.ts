import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage-about',
  templateUrl: './homepage-about.component.html',
  styleUrls: ['./homepage-about.component.scss'],
})
export class HomepageAboutComponent {
  public birthday: Date = new Date(1993, 10, 14);

  public calculateAge(birthday: Date): number {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
