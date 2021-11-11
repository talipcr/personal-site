import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage-skills',
  templateUrl: './homepage-skills.component.html',
  styleUrls: ['./homepage-skills.component.scss'],
})
export class HomepageSkillsComponent {
  mockSkillData = [
    {
      name: 'Frontend',
      description: ['Angular', 'React'],
    },
    {
      name: 'Other',
      description: ['Docker', 'CI/CD'],
    },
  ];

  constructor() {}
}
