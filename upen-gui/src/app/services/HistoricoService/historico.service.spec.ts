import { TestBed } from '@angular/core/testing';

import { HistoricoService } from './historico.service';

describe('HistoricoService', () => {
  let service: HistoricoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoricoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
