import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RetiroEfectivoRoutingModule } from './retiro-efectivo-routing.module';
import { RetiroEfectivoComponent } from './retiro-efectivo.component';
import { MaterialModule } from '@app/material.module';


@NgModule({
  declarations: [RetiroEfectivoComponent],
  imports: [
    CommonModule,
    RetiroEfectivoRoutingModule,
    MaterialModule,
  ]
})
export class RetiroEfectivoModule { }
