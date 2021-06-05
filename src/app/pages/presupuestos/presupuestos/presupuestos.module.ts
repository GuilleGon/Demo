import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresupuestosRoutingModule } from './presupuestos-routing.module';
import { PresupuestosComponent } from './presupuestos.component';
import { MaterialModule } from '@app/material.module';


@NgModule({
  declarations: [PresupuestosComponent],
  imports: [
    CommonModule,
    PresupuestosRoutingModule,
    MaterialModule,
  ]
})
export class PresupuestosModule { }
