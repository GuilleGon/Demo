import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService } from '@app/pages/clientes/clientes.service';
import { ClienteDetalle } from '@app/shared/models/client.interfase';
import { Subscription } from 'rxjs';
import { PresupuestosService } from '../presupuestos.service';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  select: string = 'Efectivo';
  forma_pago: string[] = ['Efectivo', 'Cheque', 'Deposito', 'Transferencia'];
  lista: string[] = [];


  constructor(
    private presuSvc: PresupuestosService,
    private fb: FormBuilder,
    private router: Router,
    private clientSvc: ClientesService,
  ) { }

  ngOnInit(): void {


    this.subscription.add(
      this.clientSvc.getAllClientD().subscribe((data) => {
        data.forEach((element: ClienteDetalle) => this.lista.push(element.razon_social));
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



  newForm = this.fb.group({  //Formulario de "detalle Cliente"
    "numero": ['', Validators.required],
    "usuario": ['', Validators.required],
    "cliente": ['', Validators.required],
    "estado": ['', Validators.required],
    "observaciones": [''],
    "descuentos": ['', Validators.required],
    "recargos": ['', Validators.required],
    "forma_pago": ['', Validators.required],
    "banco": [''],
    "nro": [''],
    "fecha": [''],
    "monto": ['', Validators.required],
    "montoI": [''],
    "tipo": [''],
    "descripcion": ['', Validators.required],
    "cantidad": ['', Validators.required]
  });



  onCreate() {
    if (this.newForm.value.descuentos == '' && this.newForm.value.recargos == '') {
      this.newForm.patchValue({ "descuentos": [0], "recargos": [0] });
    } else if (this.newForm.value.descuentos == '') {
      this.newForm.patchValue({ "descuentos": [0] });
    } else if (this.newForm.value.recargos == '') {
      this.newForm.patchValue({ "recargos": [0] });
    }


    if (this.newForm.invalid) {
      return;
    }




    const formValue = this.newForm.value;
    this.subscription.add(
      this.presuSvc.newPresu(formValue).subscribe((data) => {
      }));
    this.router.navigate(['/presupuestos'])

  }
}
