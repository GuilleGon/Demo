import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Proveedores } from '@app/shared/models/proveedores';
import { Subscription } from 'rxjs';
import { ProveedoresServiceService } from '../proveedores-service.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit, OnDestroy {

  public id = this.active.snapshot.params.id;
  private subscription: Subscription = new Subscription();
  habilitado: boolean = true;
  message: string = 'Deshabilitado';
  lista: string[] = [];

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
    private provtSvc: ProveedoresServiceService,
    private active: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {


    this.subscription.add(
      this.provtSvc.getById(this.id).subscribe((proveedores: Proveedores) => {
        this.upForm.patchValue({  //Asinga los valores al "detalle proveedores"
          "razon_social": proveedores.razon_social,
          "CUIT": proveedores.CUIT,
          "telefono": proveedores.telefono,
          "email": proveedores.email,
          "direccion": proveedores.direccion,
        })
      }));
    this.upForm.disable();
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  upForm = this.fb.group({  //Formulario de "detalle proveedor"
    "id": this.id,
    "razon_social": ['', Validators.required],
    "CUIT": ['', Validators.required],
    "telefono": ['', Validators.required],
    "email":['', Validators.required] ,
    "direccion": ['', Validators.required],
  });



  updateProv() {
    const formValue = this.upForm.value;
    this.subscription.add(
      this.provtSvc.updateProvedoores(formValue).subscribe(data => {
        console.log(data);
        this.router.navigate(['/proveedores'])
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
    private presuSvc: ProveedoresServiceService,
    private router: Router,
    public dialogRef: MatDialogRef<DialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  accept() {
    this.presuSvc.deleteProvedoores(this.data.id).subscribe(data => {
      console.log(data);
      this.dialogRef.close();
      this.router.navigate(['/proveedores'])
    })
  }
}
