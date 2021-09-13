import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GastosRoutingModule } from './gastos-routing.module';
import { GastosComponent } from './gastos.component';
import { MaterialModule } from '@app/material.module';


@NgModule({
  declarations: [GastosComponent],
  imports: [
    CommonModule,
    GastosRoutingModule,
    MaterialModule,
  ]
})
export class GastosModule { }
