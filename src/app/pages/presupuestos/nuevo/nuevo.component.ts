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


    /*const user = JSON.parse(localStorage.getItem('user'));
    
    this.newForm.patchValue({
      "usuario": user.role
    })
    console.log(user.role, 'asdas')*/
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
    "descuentos": [0, Validators.required],
    "recargos": [0, Validators.required],
    "forma_pago": ['', Validators.required],
    "banco": [''],
    "nro": [0],
    "fecha_vencimiento": [new Date()],
    "monto": ['', Validators.required],
    "total": [''],
    "tipo": ['', Validators.required],
    "descripcion": [''],
    "cantidad": ['', Validators.required]
  });



  onCreate() {


    const formValue = this.newForm.value;
    this.subscription.add(
      this.presuSvc.newPresu(formValue).subscribe(data => console.log(data))
    );
    //this.router.navigate(['/presupuestos']);
  }
}
