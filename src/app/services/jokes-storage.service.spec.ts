import { TestBed } from '@angular/core/testing';

import { JokesStorageService } from './jokes-storage.service';

describe('JokesStorageService', () => {
  let service: JokesStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JokesStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
