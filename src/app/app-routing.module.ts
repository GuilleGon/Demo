import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckLoginGuard } from './shared/guards/check-login.guard';

const routes: Routes = [

  { path: '', loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule) },

  { canActivate: [CheckLoginGuard], path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule) },

  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  

  { path: 'clientes', loadChildren: () => import('./pages/clientes/clientes/clientes.module').then(m => m.ClientesModule) },
  { path: 'clientesD/:id', loadChildren: () => import('./pages/clientes/clientes-d/clientes-d.module').then(m => m.ClientesDModule) },
  { path: 'newClient', loadChildren: () => import('./pages/clientes/nuevoc/nuevoc.module').then(m => m.NuevocModule) },


  { path: 'admin', loadChildren: () => import('./pages/user-admin/admin/admin.module').then(m => m.AdminModule) },
  { path: 'userD/:id', loadChildren: () => import('./pages/user-admin/user-detail/user-detail.module').then(m => m.UserDetailModule) },
  { path: 'nuevo-usuario', loadChildren: () => import('./pages/user-admin/nuevou/nuevou.module').then(m => m.NuevouModule) },


  { path: 'caja', loadChildren: () => import('./pages/caja/caja.module').then(m => m.CajaModule) },


  { path: 'efectivo', loadChildren: () => import('./pages/retiro-efectivo/retiro-efectivo.module').then(m => m.RetiroEfectivoModule) },
  { path: 'efectivo/detalleR/:id', loadChildren: () => import('./pages/retiro-efectivo/detalles/detalles.module').then(m => m.DetallesModule) },
  { path: 'nuevoE', loadChildren: () => import('./pages/retiro-efectivo/nuevo/nuevo.module').then(m => m.NuevoModule) },
  

  { path: 'recibos', loadChildren: () => import('./pages/recibos/recibos.module').then(m => m.RecibosModule) },
  { path: 'recibos/detalleRec', loadChildren: () => import('./pages/recibos/detalles/detalles.module').then(m => m.DetallesModule) },
  { path: 'recibos/nuevoR', loadChildren: () => import('./pages/recibos/nuevo/nuevo.module').then(m => m.NuevoModule) },

  { path: 'bancos', loadChildren: () => import('./pages/bancos/bancos.module').then(m => m.BancosModule) },
  { path: 'detalleB', loadChildren: () => import('./pages/bancos/detalles/detalles.module').then(m => m.DetallesModule) },

  { path: 'presupuestos', loadChildren: () => import('./pages/presupuestos/presupuestos/presupuestos.module').then(m => m.PresupuestosModule) },
  { path: 'presupuestos/presupuestosD/:id', loadChildren: () => import('./pages/presupuestos/detalles/detalles.module').then(m => m.DetallesModule) },
  { path: 'presupuestos/nuevoP', loadChildren: () => import('./pages/presupuestos/nuevo/nuevo.module').then(m => m.NuevoModule) },

  { path: 'cheques', loadChildren: () => import('./pages/cheques/cheques.module').then(m => m.ChequesModule) },

  { path: 'precios', loadChildren: () => import('./pages/precios/precios/precios.module').then(m => m.PreciosModule) },
  { path: 'precios/nuevo', loadChildren: () => import('./pages/precios/nuevo/nuevo.module').then(m => m.NuevoModule) },
  { path: 'precios/detalles', loadChildren: () => import('./pages/precios/detalles/detalles.module').then(m => m.DetallesModule) },

  




  { path: '**', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }