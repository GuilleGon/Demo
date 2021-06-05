import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EfectivoService } from '../efectivo.service';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  newForm = this.fb.group({
    "numero": [''],
    "responsable": [''],
    "concepto": [''],
    "monto": ['']
  });
  
  constructor(
    private fb: FormBuilder,
    private retiro: EfectivoService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onCreate(){
    const formValue = this.newForm.value;
    this.subscription.add(
      this.retiro.crearRetiro(formValue).subscribe()
    );
    this.router.navigate(['/efectivo']);
  }

}
