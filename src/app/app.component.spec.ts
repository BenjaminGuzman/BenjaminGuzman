import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavService } from './nav/nav.service';
import { SupabaseService } from './supabase.service';
import { Component, Input } from '@angular/core';

// Mock components to satisfy Angular's view children and template parsing
@Component({ selector: 'app-nav', template: '' })
class MockNavComponent {}

@Component({ selector: 'app-social-media', template: '' })
class MockSocialMediaComponent {}

@Component({ selector: 'app-portfolio', template: '' })
class MockPortfolioComponent {
  showProjects() {}
}

@Component({ selector: 'app-papers', template: '' })
class MockPapersComponent {}

@Component({ selector: 'app-experience', template: '' })
class MockExperienceComponent {}

@Component({ selector: 'app-skills', template: '' })
class MockSkillsComponent {}

@Component({ selector: 'app-footer', template: '' })
class MockFooterComponent {}

@Component({ selector: 'app-matrix-animation', template: '' })
class MockMatrixAnimationComponent {}

describe('AppComponent', () => {
  beforeEach(async () => {
    const navServiceSpy = jasmine.createSpyObj('NavService', ['setActiveFragment']);
    const supabaseServiceSpy = jasmine.createSpyObj('SupabaseService', ['isCacheHealthy']);
    
    // Default mock behavior
    supabaseServiceSpy.isCacheHealthy.and.returnValue(true);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        MockNavComponent,
        MockSocialMediaComponent,
        MockPortfolioComponent,
        MockPapersComponent,
        MockExperienceComponent,
        MockSkillsComponent,
        MockFooterComponent,
        MockMatrixAnimationComponent
      ],
      providers: [
        { provide: NavService, useValue: navServiceSpy },
        { provide: SupabaseService, useValue: supabaseServiceSpy }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render benjamin guzman name', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Benjamín Guzmán');
  });
});
