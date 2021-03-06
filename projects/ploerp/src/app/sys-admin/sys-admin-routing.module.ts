import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { routerGuard } from './plo-guard/router-guard';
import { PloLayoutComponent } from './plo-layout/plo-layout.component';
import { DashboardComponent } from './plo-pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: PloLayoutComponent,
    canActivate: [routerGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'sys',
        loadChildren: () => import('./plo-pages/sys-setting/sys-setting.module').then(m => m.SysSettingModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysAdminRoutingModule { }
