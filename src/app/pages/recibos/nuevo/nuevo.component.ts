import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PresupuestosService } from '@app/pages/presupuestos/presupuestos.service';
import { Presuspuestos } from '@app/shared/models/presupuestos';
import { Subscription } from 'rxjs';
import { RecibosService } from '../recibos.service';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  lista: Presuspuestos[] = [];


  constructor(
    private rcvoSvc: RecibosService,
    private fb: FormBuilder,
    private router: Router,
    private presuSvc: PresupuestosService,
  ) { }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.presuSvc.getAll().subscribe((data) => {
        data.forEach((element: Presuspuestos) => this.lista.push(element)); 
        
      })
    );

  }

  
  newForm = this.fb.group({  //Formulario de "detalle Cliente"
    "numero": ['', Validators.required],
    "cliente": ['', Validators.required],
    "fecha_emision": ['', Validators.required],
    "forma_pago": ['', Validators.required],
    "monto": ['', Validators.required],
    "cantidad": ['', Validators.required]
  });


  onCreate() {
    const formValue = this.newForm.value;
    this.subscription.add(
      this.rcvoSvc.newRecibo(formValue).subscribe(data => console.log(data))
    );
    this.router.navigate(['/presupuestos']);
  }

}
