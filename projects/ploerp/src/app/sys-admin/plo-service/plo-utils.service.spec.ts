import { TestBed } from '@angular/core/testing';

import { PloUtilsService } from './plo-utils.service';

describe('PloUtilsService', () => {
  let service: PloUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PloUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
