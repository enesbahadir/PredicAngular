import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreschoolFormComponent } from './preschool-form.component';

describe('PreschoolFormComponent', () => {
  let component: PreschoolFormComponent;
  let fixture: ComponentFixture<PreschoolFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreschoolFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreschoolFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
