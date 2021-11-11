import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageBlogComponent } from './homepage-blog.component';

describe('HomepageBlogComponent', () => {
  let component: HomepageBlogComponent;
  let fixture: ComponentFixture<HomepageBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
