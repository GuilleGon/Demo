import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService } from '@app/pages/clientes/clientes.service';
import { ProveedoresServiceService } from '@app/pages/proveedores/proveedores-service.service';
import { Gastos } from '@app/shared/models/gastos';
import { Proveedores } from '@app/shared/models/proveedores';
import { Subscription } from 'rxjs';
import { GastosServiceService } from '../gastos-service.service';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent implements OnInit {

  
  private subscription: Subscription = new Subscription();
  select: string = 'Efectivo';
  forma_pago: string[] = ['Efectivo', 'Cheque', 'Deposito', 'Transferencia'];
  lista: string[] = [];


  constructor(
    private gastoSvc: GastosServiceService,
    private fb: FormBuilder,
    private router: Router,
    private provSvc: ProveedoresServiceService,
  ) { }

  ngOnInit(): void {


    this.subscription.add(
      this.provSvc.getAll().subscribe((data) => {
        data.forEach((element: Proveedores) => this.lista.push(element.razon_social));
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



  newForm = this.fb.group({  //Formulario de "detalle Gasto"
    "numero": ['', Validators.required],
    "proveedor": ['', Validators.required],
    "concepto": ['', Validators.required],
    "forma_pago": ['', Validators.required],
    "banco": [''],
    "nro": [''],
    "fecha": [' '],
    "monto": ['', Validators.required],
  });



  onCreate() {


    if (this.newForm.invalid) {
      return;
    }




    const formValue = this.newForm.value;
    this.subscription.add(
      this.gastoSvc.newGasto(formValue).subscribe((data) => {
      }));
    this.router.navigate(['/gastos'])

  }

}
