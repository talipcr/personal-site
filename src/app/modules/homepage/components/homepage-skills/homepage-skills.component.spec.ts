import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageSkillsComponent } from './homepage-skills.component';

describe('HomepageSkillsComponent', () => {
  let component: HomepageSkillsComponent;
  let fixture: ComponentFixture<HomepageSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
