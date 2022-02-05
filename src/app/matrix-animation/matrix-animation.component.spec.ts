import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MatrixAnimationComponent} from './matrix-animation.component';

describe('MatrixAnimationComponent', () => {
  let component: MatrixAnimationComponent;
  let fixture: ComponentFixture<MatrixAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrixAnimationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
