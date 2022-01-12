import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PloPageNotfoundComponent } from './sys-admin/plo-component/plo-page-notfound/plo-page-notfound.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./sys-admin/sys-admin.module').then(m => m.SysAdminModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./sys-login/sys-login.module').then(m => m.SysLoginModule)
  },
  {
    path: '**',
    component: PloPageNotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
