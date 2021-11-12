import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { HomepageAboutComponent } from './components/homepage-about/homepage-about.component';
import { HomepageBlogComponent } from './components/homepage-blog/homepage-blog.component';
import { HomepageExperienceComponent } from './components/homepage-experience/homepage-experience.component';
import { HomepageLayoutComponent } from './components/homepage-layout/homepage-layout.component';
import { HomepageProjectsComponent } from './components/homepage-projects/homepage-projects.component';
import { HomepageSkillsComponent } from './components/homepage-skills/homepage-skills.component';
import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';
import { HomepageCertificationsComponent } from './components/homepage-certifications/homepage-certifications.component';

const COMPONENTS = [
  HomepageComponent,
  HomepageLayoutComponent,
  HomepageAboutComponent,
  HomepageProjectsComponent,
  HomepageBlogComponent,
  HomepageExperienceComponent,
  HomepageSkillsComponent,
  HomepageCertificationsComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [HomepageRoutingModule, CoreModule],
})
export class HomepageModule {}
