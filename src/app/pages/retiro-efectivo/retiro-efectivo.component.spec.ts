import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetiroEfectivoComponent } from './retiro-efectivo.component';

describe('RetiroEfectivoComponent', () => {
  let component: RetiroEfectivoComponent;
  let fixture: ComponentFixture<RetiroEfectivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetiroEfectivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetiroEfectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
