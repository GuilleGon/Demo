import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteDetalle } from '@app/shared/models/client.interfase';
import { Subscription } from 'rxjs';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-clientes-d',
  templateUrl: './clientes-d.component.html',
  styleUrls: ['./clientes-d.component.scss']
})
export class ClientesDComponent implements OnInit, OnDestroy {

  public id = this.active.snapshot.params.id;
  private subscription: Subscription = new Subscription();
  habilitado: boolean = true;
  message: string = 'Deshabilitado';

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
    private clieSvc: ClientesService,
    private active: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.clieSvc.getClientById(this.id).subscribe((cliente: ClienteDetalle) => {
        this.upForm.patchValue({  //Asinga los valores al "detalle cliente"
          "razon_social": cliente.razon_social,
          "email": cliente.email,
          "direccion": cliente.direccion,
          "tipo_cliente": cliente.tipo_cliente,
          "CUIT": cliente.CUIT,
          "presupuestos_emitidos": cliente.presupuestos_emitidos,
          "presupuestos_pendientes": cliente.presupuestos_pendientes,
          "telefono": cliente.telefono
        })
      }));
    this.upForm.disable();
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  upForm = this.fb.group({  //Formulario de "detalle Cliente"
    "id": this.id,
    "razon_social": [''],
    "email": [''],
    "direccion": [''],
    "tipo_cliente": [''],
    "CUIT": [''],
    "presupuestos_emitidos": [''],
    "presupuestos_pendientes": [''],
    "telefono": ['']
  });



  updateClient() {
    const formValue = this.upForm.value;
    this.subscription.add(
      this.clieSvc.updateClient(formValue).subscribe(data => {
        console.log(data);
        this.router.navigate(['/clientes'])
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
    private clieSvc: ClientesService,
    private router: Router,
    public dialogRef: MatDialogRef<DialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  accept() {
    this.clieSvc.deleteClient(this.data.id).subscribe(data => {
      console.log(data);
      this.dialogRef.close();
      this.router.navigate(['/clientes'])
    })
  }

}