import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPneusComponent } from './lista-pneus.component';

describe('ListaPneusComponent', () => {
  let component: ListaPneusComponent;
  let fixture: ComponentFixture<ListaPneusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPneusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPneusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
