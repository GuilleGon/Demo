import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesDComponent } from './clientes-d.component';

const routes: Routes = [{ path: '', component: ClientesDComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesDRoutingModule { }
