import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuListComponent } from './menu-list/menu-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'menus' },
  {
    path: 'menus',
    component: MenuListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysSettingRoutingModule { }
