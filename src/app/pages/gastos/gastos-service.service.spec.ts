import { TestBed } from '@angular/core/testing';

import { GastosServiceService } from './gastos-service.service';

describe('GastosServiceService', () => {
  let service: GastosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GastosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
