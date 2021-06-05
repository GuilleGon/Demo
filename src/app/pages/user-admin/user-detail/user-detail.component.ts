import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetail } from '@app/shared/models/user.interface';
import { Subscription } from 'rxjs';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  hide = true;
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
    private userSvc: UsuariosService,
    private active: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.userSvc.getUserById(this.id).subscribe((user: UserDetail) => {
      this.upForm.patchValue({  //Asinga los valores al "detalle cliente"
        "username": user.username,
        "password": user.password,
        "role": user.role,
      })
    });
    this.upForm.disable();
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  upForm = this.fb.group({  //Formulario de "detalle user"
    "id": this.id,
    "username": [''],
    "password": [''],
    "role": ['']
  });



  updateUser() {
    const formValue = this.upForm.value;
    this.subscription.add(
      this.userSvc.updateUser(formValue).subscribe(data => {
        console.log(data);
        this.router.navigate(['/admin'])
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
    private usuSvc: UsuariosService,
    private router: Router,
    public dialogRef: MatDialogRef<DialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  accept() {
    this.usuSvc.deleteUser(this.data.id).subscribe(data => {
      console.log(data);
      this.dialogRef.close();
      this.router.navigate(['/admin'])
    })
  }

}