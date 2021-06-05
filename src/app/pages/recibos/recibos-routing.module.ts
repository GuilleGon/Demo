import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecibosComponent } from './recibos.component';

const routes: Routes = [{ path: '', component: RecibosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecibosRoutingModule { }
