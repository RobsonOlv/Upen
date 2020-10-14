import { TestBed } from '@angular/core/testing';

import { ListaPneusService } from './lista-pneus.service';

describe('ListaPneusService', () => {
  let service: ListaPneusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaPneusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
