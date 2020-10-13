import { TestBed } from '@angular/core/testing';

import { PneuElementoService } from './pneu-elemento.service';

describe('PneuElementoService', () => {
  let service: PneuElementoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PneuElementoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
