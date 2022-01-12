import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PloPageNotfoundComponent } from '../../plo-component/plo-page-notfound/plo-page-notfound.component';
import { routerGuard } from '../../plo-guard/router-guard';
import { DruidComponent } from './druid/druid.component';
import { MenuListComponent } from './menu-list/menu-list.component';

const routes: Routes = [
  {
    path: 'menus',
    component: MenuListComponent,
    canActivate: [routerGuard],
  },
  {
    path: 'druid',
    component: DruidComponent,
    canActivate: [routerGuard],
  },
  {
    path: '**',
    component: PloPageNotfoundComponent,
    data: { hasChildren: true }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysSettingRoutingModule { }
