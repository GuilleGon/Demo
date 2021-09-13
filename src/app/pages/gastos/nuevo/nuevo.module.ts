import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NuevoRoutingModule } from './nuevo-routing.module';
import { NuevoComponent } from './nuevo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';


@NgModule({
  declarations: [NuevoComponent],
  imports: [
    CommonModule,
    NuevoRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class NuevoModule { }
