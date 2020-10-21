import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreschoolDetailComponent } from './preschool-detail.component';

describe('PreschoolDetailComponent', () => {
  let component: PreschoolDetailComponent;
  let fixture: ComponentFixture<PreschoolDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreschoolDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreschoolDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
