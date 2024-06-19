import { TestBed } from '@angular/core/testing';

import { GrowwService } from './groww.service';

describe('GrowwService', () => {
  let service: GrowwService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrowwService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
