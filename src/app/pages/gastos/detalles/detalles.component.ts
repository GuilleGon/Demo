import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedoresServiceService } from '@app/pages/proveedores/proveedores-service.service';
import { Gastos } from '@app/shared/models/gastos';
import { Proveedores } from '@app/shared/models/proveedores';
import { Subscription } from 'rxjs';
import { GastosServiceService } from '../gastos-service.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {

  public id = this.active.snapshot.params.id;
  private subscription: Subscription = new Subscription();
  habilitado: boolean = true;
  message: string = 'Deshabilitado';
  lista: string[] = [];

  forma_pago: string[] = ['Efectivo', 'Cheque', 'Deposito', 'Transferencia'];
  select: string;

  edicion() {
    if (this.habilitado == false) {
      this.habilitado = true;
      this.message = 'Deshabilitado';
      this.upForm.disable();
    } else {
      this.habilitado = false
      this.message = "Habilitado";
      this.upForm.enable()
    }
  }

  constructor(
    private provSvc: ProveedoresServiceService,
    private gastoSvc: GastosServiceService,
    private active: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {




    this.subscription.add(
      this.gastoSvc.getById(this.id).subscribe((gastos: Gastos) => {

        this.provSvc.getAll().subscribe((data) => {
          data.forEach((element: Proveedores) => {
            this.lista.push(element.razon_social);
          });
        }),


          this.upForm.patchValue({  //Asinga los valores al "detalle gastos"
            "numero": gastos.numero,
            "proveedor": gastos.proveedor,
            "fecha_emision": gastos.fecha_emision,
            "concepto": gastos.concepto,
            "forma_pago": gastos.forma_pago,
            "banco": gastos.banco,
            "nro": gastos.nro,
            "fecha": gastos.fecha,
            "monto": gastos.monto,
          })
        this.select = gastos.forma_pago;
      }));
    this.upForm.disable();
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  upForm = this.fb.group({  //Formulario de "detalle Gasto"
    "id": this.id,
    "numero": ['', Validators.required],
    "proveedor": ['', Validators.required],
    "fecha_emision": ['', Validators.required],
    "concepto": [0, Validators.required],
    "forma_pago": ['', Validators.required],
    "banco": [''],
    "nro": [''],
    "fecha": [' '],
    "monto": ['', Validators.required],
  });



  updateGasto() {
    const formValue = this.upForm.value;
    this.subscription.add(
      this.gastoSvc.updateGasto(formValue).subscribe(data => {
        console.log(data);
        this.router.navigate(['/gastos'])
      })
    );
  }


  onDelete() {
    const dialogRef = this.dialog.open(DialogOverview, {
      width: '300px',
      data: { id: this.id },
      closeOnNavigation: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'aceptar-cancelar',
  templateUrl: 'aceptar-cancelar.html',
})
export class DialogOverview {
  constructor(
    private gastoSvc: GastosServiceService,
    private router: Router,
    public dialogRef: MatDialogRef<DialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  accept() {
    this.gastoSvc.deleteGasto(this.data.id).subscribe(data => {
      console.log(data);
      this.dialogRef.close();
      this.router.navigate(['/gastos'])
    })
  }
}
