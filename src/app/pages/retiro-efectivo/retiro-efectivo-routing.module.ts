import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetiroEfectivoComponent } from './retiro-efectivo.component';

const routes: Routes = [{ path: '', component: RetiroEfectivoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetiroEfectivoRoutingModule { }
