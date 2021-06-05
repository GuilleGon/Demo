import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BancosRoutingModule } from './bancos-routing.module';
import { BancosComponent } from './bancos.component';


@NgModule({
  declarations: [BancosComponent],
  imports: [
    CommonModule,
    BancosRoutingModule
  ]
})
export class BancosModule { }
