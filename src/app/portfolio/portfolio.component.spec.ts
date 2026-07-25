import {ComponentFixture, TestBed} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {PortfolioComponent} from './portfolio.component';

describe('PortfolioComponent', () => {
  let component: PortfolioComponent;
  let fixture: ComponentFixture<PortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NoopAnimationsModule ],
      declarations: [ PortfolioComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initially load 3 projects in renderedProjects', async () => {
    // ngOnInit is called which awaits things. 
    // Wait for the next tick to ensure projects are loaded.
    await fixture.whenStable();
    expect(component.renderedProjects.length).toBe(3);
    // Note: total hardcoded projects are 14. 
    // 3 are popped, so remaining in projects array should be 11.
    expect(component.projects.length).toBe(11);
  });

  it('should load 3 more projects when loadMore is called', async () => {
    await fixture.whenStable();
    expect(component.renderedProjects.length).toBe(3);
    
    component.loadMore(false); // pass false to avoid scrollIntoView which might fail in jsdom
    
    expect(component.renderedProjects.length).toBe(6);
    expect(component.projects.length).toBe(8);
  });
});
