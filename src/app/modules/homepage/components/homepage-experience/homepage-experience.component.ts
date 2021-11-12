import { Component } from '@angular/core';
import { experienceData } from 'src/app/shared/mock/data';

@Component({
  selector: 'app-homepage-experience',
  templateUrl: './homepage-experience.component.html',
  styleUrls: ['./homepage-experience.component.scss'],
})
export class HomepageExperienceComponent {
  experienceData = experienceData;
}
