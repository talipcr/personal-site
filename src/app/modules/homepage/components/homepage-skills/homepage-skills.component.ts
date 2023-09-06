import { Component } from '@angular/core';
import { skillsData } from 'src/app/shared/mock/data';

@Component({
  selector: 'app-homepage-skills',
  templateUrl: './homepage-skills.component.html',
  styleUrls: ['./homepage-skills.component.scss'],
})
export class HomepageSkillsComponent {
  skillsData = skillsData;
}
