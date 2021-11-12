import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageCertificationsComponent } from './homepage-certifications.component';

describe('HomepageCertificationsComponent', () => {
  let component: HomepageCertificationsComponent;
  let fixture: ComponentFixture<HomepageCertificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageCertificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageCertificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
