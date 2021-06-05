import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesDComponent } from './clientes-d.component';

describe('ClientesDComponent', () => {
  let component: ClientesDComponent;
  let fixture: ComponentFixture<ClientesDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientesDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
