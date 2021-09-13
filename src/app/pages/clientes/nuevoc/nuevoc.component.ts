import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-nuevoc',
  templateUrl: './nuevoc.component.html',
  styleUrls: ['./nuevoc.component.scss']
})
export class NuevocComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  newForm = this.fb.group({
    "razon_social": [''],
    "email": [''],
    "direccion": [''],
    "tipo_cliente": [''],
    "CUIT": [''],
    "presupuestos_emitidos": [''],
    "presupuestos_pendientes": [''],
    "telefono": ['']
  });




  constructor(
    private fb: FormBuilder,
    private clientSvc: ClientesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onCreate() {
    if (this.newForm.invalid) {
      return;
    }

    const formValue = this.newForm.value;
    this.subscription.add(
      this.clientSvc.newClient(formValue).subscribe());
    this.router.navigate(['/clientes']);
  }


}
