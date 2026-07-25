import {ComponentFixture, TestBed} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {ProjectComponent} from './project.component';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NoopAnimationsModule ],
      declarations: [ ProjectComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    component.projectData = { imgUrls: [], techStack: [], tags: [], links: [] } as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with descriptionAnimationState as closed', () => {
    expect(component.descriptionAnimationState).toBe('closed');
  });

  it('should toggle descriptionAnimationState on toggleDescriptionAnimation()', () => {
    // Reset animationChangedAt so the 500ms debounce doesn't block the test
    component.animationChangedAt = new Date(new Date().getTime() - 1000);
    
    component.toggleDescriptionAnimation();
    expect(component.descriptionAnimationState).toBe('open');

    component.animationChangedAt = new Date(new Date().getTime() - 1000);
    component.toggleDescriptionAnimation();
    expect(component.descriptionAnimationState).toBe('closed');
  });
});
