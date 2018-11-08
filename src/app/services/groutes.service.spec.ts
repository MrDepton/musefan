import { TestBed } from '@angular/core/testing';

import { GroutesService } from './groutes.service';

describe('GroutesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroutesService = TestBed.get(GroutesService);
    expect(service).toBeTruthy();
  });
});
