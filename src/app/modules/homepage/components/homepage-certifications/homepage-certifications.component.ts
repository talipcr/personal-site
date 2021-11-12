import { Component } from '@angular/core';
import { certificationsData } from 'src/app/shared/mock/data';

@Component({
  selector: 'app-homepage-certifications',
  templateUrl: './homepage-certifications.component.html',
  styleUrls: ['./homepage-certifications.component.scss'],
})
export class HomepageCertificationsComponent {
  certificationsData = certificationsData;

  constructor() {}
}
