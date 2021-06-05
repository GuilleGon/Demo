import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from '@app/pages/clientes/clientes.service';
import { ClienteDetalle } from '@app/shared/models/client.interfase';
import { Presuspuestos } from '@app/shared/models/presupuestos';
import { Subscription } from 'rxjs';
import { PresupuestosService } from '../presupuestos.service';

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
    private clientSvc: ClientesService,
    private presuSvc: PresupuestosService,
    private active: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.subscription.add(
      this.clientSvc.getAllClientD().subscribe((data) => {
        data.forEach((element: ClienteDetalle) => this.lista.push(element.razon_social));
      })
    );



    this.subscription.add(
      this.presuSvc.getById(this.id).subscribe((presupuesto: Presuspuestos) => {
        this.upForm.patchValue({  //Asinga los valores al "detalle presupuesto"
          "numero": presupuesto.numero,
          "usuario": presupuesto.usuario,
          "cliente": presupuesto.cliente,
          "fecha_emision": presupuesto.fecha_emision,
          "estado": presupuesto.estado,
          "observaciones": presupuesto.observaciones,
          "descuentos": presupuesto.descuentos,
          "recargos": presupuesto.recargos,
          "forma_pago": presupuesto.forma_pago,
          "banco": presupuesto.banco,
          "nro": presupuesto.nro,
          "fecha_vencimiento": presupuesto.fecha_vencimiento,
          "monto": presupuesto.monto,
          "total": presupuesto.total,
          "tipo": presupuesto.tipo,
          "descripcion": presupuesto.descripcion,
          "cantidad": presupuesto.cantidad
        })
        this.select = presupuesto.forma_pago;
      }));
    this.upForm.disable();
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  upForm = this.fb.group({  //Formulario de "detalle Cliente"
    "id": this.id,
    "numero": [''],
    "usuario": [''],
    "cliente": [''],
    "fecha_emision": [''],
    "estado": [''],
    "observaciones": [''],
    "descuentos": [''],
    "recargos": [''],
    "forma_pago": [''],
    "banco": [''],
    "nro": [''],
    "fecha_vencimiento": [''],
    "monto": [''],
    "total": [''],
    "tipo": [''],
    "descripcion": [''],
    "cantidad": ['']
  });



  updatePresu() {
    const formValue = this.upForm.value;
    this.subscription.add(
      this.presuSvc.updatePresu(formValue).subscribe(data => {
        console.log(data);
        this.router.navigate(['/presupuestos'])
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
    private presuSvc: PresupuestosService,
    private router: Router,
    public dialogRef: MatDialogRef<DialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  accept() {
    this.presuSvc.deletePresu(this.data.id).subscribe(data => {
      console.log(data);
      this.dialogRef.close();
      this.router.navigate(['/presupuestos'])
    })
  }
}
