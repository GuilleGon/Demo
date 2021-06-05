import { TestBed } from '@angular/core/testing';

import { EfectivoService } from './efectivo.service';

describe('EfectivoService', () => {
  let service: EfectivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EfectivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
