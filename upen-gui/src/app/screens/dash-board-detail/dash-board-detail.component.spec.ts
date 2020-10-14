import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardDetailComponent } from './dash-board-detail.component';

describe('DashBoardDetailComponent', () => {
  let component: DashBoardDetailComponent;
  let fixture: ComponentFixture<DashBoardDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashBoardDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBoardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
