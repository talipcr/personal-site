import { Component } from '@angular/core';
import { projectsData } from 'src/app/shared/mock/data';

@Component({
  selector: 'app-homepage-projects',
  templateUrl: './homepage-projects.component.html',
  styleUrls: ['./homepage-projects.component.scss'],
})
export class HomepageProjectsComponent {
  projectsData = projectsData;
}
