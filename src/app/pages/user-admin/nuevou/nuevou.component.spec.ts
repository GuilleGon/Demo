import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevouComponent } from './nuevou.component';

describe('NuevouComponent', () => {
  let component: NuevouComponent;
  let fixture: ComponentFixture<NuevouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevouComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
