import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PapersComponent } from './papers.component';

describe('PapersComponent', () => {
  let component: PapersComponent;
  let fixture: ComponentFixture<PapersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PapersComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
