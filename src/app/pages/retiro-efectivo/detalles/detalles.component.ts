import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Retiro } from '@app/shared/models/retiro.interface';
import { Subscription } from 'rxjs';
import { EfectivoService } from '../efectivo.service';

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
    private fb: FormBuilder,
    private active: ActivatedRoute,
    private dialog: MatDialog,
    private retiro: EfectivoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.retiro.getById(this.id).subscribe((retiro: Retiro) => {
        this.upForm.patchValue({  //Asinga los valores al "detalle"
          "numero": retiro.numero,
          "responsable": retiro.responsable,
          "concepto": retiro.concepto,
          "monto": retiro.monto,
          "fecha": retiro.fecha,
        })
      }));
    this.upForm.disable();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  upForm = this.fb.group({  //Formulario de "detalle retiro"
    "id": this.id,
    "numero": [''],
    "responsable": [''],
    "concepto": [''],
    "monto": [''],
    "fecha": [''],
  });

  updateRetiro() {
    const formValue = this.upForm.value;
    this.subscription.add(
      this.retiro.editarRetiro(formValue).subscribe(data => {
        console.log(data);
        this.router.navigate(['/efectivo'])
      })
    );
  }

  onDelete() {
    const dialogRef = this.dialog.open(DialogOverview, {
      width: '300px',
      data: { id: this.id },
      closeOnNavigation: false
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe());
  }

}

@Component({
  selector: 'aceptar-cancelar',
  templateUrl: 'aceptar-cancelar.html',
})
export class DialogOverview implements OnDestroy {

  private subscription: Subscription = new Subscription();
  constructor(
    private retiro: EfectivoService,
    private router: Router,
    public dialogRef: MatDialogRef<DialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  accept() {
    this.subscription.add(
      this.retiro.borrarRetiro(this.data.id).subscribe(data => {
        console.log(data);
        this.dialogRef.close();
        this.router.navigate(['/efectivo'])
      }))
  }

}
