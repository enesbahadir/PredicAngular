import { TestBed } from '@angular/core/testing';

import { DiscountValuesService } from './discount-values.service';

describe('DiscountValuesService', () => {
  let service: DiscountValuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscountValuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
