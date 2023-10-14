import { TestBed } from '@angular/core/testing';

import { ChuckAPIService } from './chuck-api.service';
import { HttpClientModule } from '@angular/common/http';

describe('ChuckAPIService', () => {
  let service: ChuckAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ChuckAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
