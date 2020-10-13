import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiculoElementoComponent } from './veiculo-elemento.component';

describe('VeiculoElementoComponent', () => {
  let component: VeiculoElementoComponent;
  let fixture: ComponentFixture<VeiculoElementoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeiculoElementoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiculoElementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
