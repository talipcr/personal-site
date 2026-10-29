import { Component } from '@angular/core';
import { educationData } from 'src/app/shared/mock/data';

@Component({
  selector: 'app-homepage-education',
  templateUrl: './homepage-education.component.html',
  styleUrls: ['./homepage-education.component.scss'],
})
export class HomepageEducationComponent {
  educationData = educationData;

  constructor() {}
}
