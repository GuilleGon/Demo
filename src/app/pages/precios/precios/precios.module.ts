import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreciosRoutingModule } from './precios-routing.module';
import { PreciosComponent } from './precios.component';


@NgModule({
  declarations: [PreciosComponent],
  imports: [
    CommonModule,
    PreciosRoutingModule
  ]
})
export class PreciosModule { }
