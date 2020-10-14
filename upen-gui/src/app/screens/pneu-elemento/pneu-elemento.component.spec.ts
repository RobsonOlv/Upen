import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PneuElementoComponent } from './pneu-elemento.component';

describe('PneuElementoComponent', () => {
  let component: PneuElementoComponent;
  let fixture: ComponentFixture<PneuElementoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PneuElementoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PneuElementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
