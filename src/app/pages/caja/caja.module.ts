import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CajaRoutingModule } from './caja-routing.module';
import { CajaComponent } from './caja.component';
import { MaterialModule } from '@app/material.module';


@NgModule({
  declarations: [CajaComponent],
  imports: [
    CommonModule,
    CajaRoutingModule,
    MaterialModule,
  ]
})
export class CajaModule { }
