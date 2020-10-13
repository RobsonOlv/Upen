import { TestBed } from '@angular/core/testing';

import { VeiculoElementoService } from './veiculo-elemento.service';

describe('VeiculoElementoService', () => {
  let service: VeiculoElementoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VeiculoElementoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
