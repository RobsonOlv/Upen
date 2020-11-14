import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LixeiraPneusComponent } from './lixeira-pneus.component';

describe('LixeiraVeiculoComponent', () => {
  let component: LixeiraPneusComponent;
  let fixture: ComponentFixture<LixeiraPneusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LixeiraPneusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LixeiraPneusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});