import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageExperienceComponent } from './homepage-experience.component';

describe('HomepageExperienceComponent', () => {
  let component: HomepageExperienceComponent;
  let fixture: ComponentFixture<HomepageExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageExperienceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
