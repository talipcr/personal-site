import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageEducationComponent } from './homepage-education.component';

describe('HomepageEducationComponent', () => {
  let component: HomepageEducationComponent;
  let fixture: ComponentFixture<HomepageEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageEducationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
