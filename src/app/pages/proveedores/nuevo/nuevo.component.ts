import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProveedoresServiceService } from '../proveedores-service.service';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent implements OnInit {

  private subscription: Subscription = new Subscription();


  constructor(
    private presuSvc: ProveedoresServiceService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  newForm = this.fb.group({  //Formulario de "detalle Cliente"
    "razon_social": ['', Validators.required],
    "CUIT": ['', Validators.required],
    "telefono": ['', Validators.required],
    "email": ['', Validators.required],
    "direccion": ['', Validators.required],
  });



  onCreate() {
    if (this.newForm.invalid) {
      return;
    }

    const formValue = this.newForm.value;
    this.subscription.add(
      this.presuSvc.newProvedoores(formValue).subscribe(data => {

      })
    );

    this.router.navigate(['/proveedores']);

  }

}
