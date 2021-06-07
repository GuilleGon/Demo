import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NuevoRoutingModule } from './nuevo-routing.module';
import { NuevoComponent } from './nuevo.component';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [NuevoComponent],
  imports: [
    CommonModule,
    NuevoRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class NuevoModule { }
