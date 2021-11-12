import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageProjectsComponent } from './homepage-projects.component';

describe('HomepageProjectsComponent', () => {
  let component: HomepageProjectsComponent;
  let fixture: ComponentFixture<HomepageProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
