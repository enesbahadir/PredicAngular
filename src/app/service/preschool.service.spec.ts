import { TestBed } from '@angular/core/testing';

import { PreschoolService } from './preschool.service';

describe('PreschoolService', () => {
  let service: PreschoolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreschoolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
