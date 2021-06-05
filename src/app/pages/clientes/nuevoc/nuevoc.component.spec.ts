import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevocComponent } from './nuevoc.component';

describe('NuevocComponent', () => {
  let component: NuevocComponent;
  let fixture: ComponentFixture<NuevocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
