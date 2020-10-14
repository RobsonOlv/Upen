import { TestBed } from '@angular/core/testing';

import { ListaVeiculoService } from './lista-veiculo.service';

describe('ListaVeiculoService', () => {
  let service: ListaVeiculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaVeiculoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
