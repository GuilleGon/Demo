import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetallesRoutingModule } from './detalles-routing.module';
import { DetallesComponent } from './detalles.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';


@NgModule({
  declarations: [DetallesComponent],
  imports: [
    CommonModule,
    DetallesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class DetallesModule { }
