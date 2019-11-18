import { TestBed } from '@angular/core/testing';

import { PromService } from './prom.service';

describe('PromService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PromService = TestBed.get(PromService);
    expect(service).toBeTruthy();
  });
});
