import { TestBed } from '@angular/core/testing';

import { ChuckAPIService } from './chuck-api.service';

describe('ChuckAPIService', () => {
  let service: ChuckAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChuckAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
