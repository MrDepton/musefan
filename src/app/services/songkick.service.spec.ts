import { TestBed } from '@angular/core/testing';

import { SongkickService } from './songkick.service';

describe('SongkickService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SongkickService = TestBed.get(SongkickService);
    expect(service).toBeTruthy();
  });
});
