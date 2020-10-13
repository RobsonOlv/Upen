import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaVeiculoComponent } from './lista-veiculo.component';

describe('ListaVeiculoComponent', () => {
  let component: ListaVeiculoComponent;
  let fixture: ComponentFixture<ListaVeiculoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaVeiculoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaVeiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
