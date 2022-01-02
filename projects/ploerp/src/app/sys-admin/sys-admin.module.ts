import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SysAdminRoutingModule } from './sys-admin-routing.module';
import { PloLayoutComponent } from './plo-layout/plo-layout.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { PloHeaderComponent } from './plo-component/plo-header/plo-header.component';
import { PloLockComponent } from './plo-component/plo-lock/plo-lock.component';
import { PloMaskComponent } from './plo-component/plo-mask/plo-mask.component';
import { PloSiderComponent } from './plo-component/plo-sider/plo-sider.component';
import { DashboardComponent } from './plo-pages/dashboard/dashboard.component';
import { PloComponentModule } from './plo-component/plo-component.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzMenuModule } from 'ng-zorro-antd/menu';



@NgModule({
  declarations: [
    PloLayoutComponent,
    PloHeaderComponent,
    PloLockComponent,
    PloMaskComponent,
    PloSiderComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SysAdminRoutingModule,
    NzLayoutModule,
    NzIconModule,
    NzMessageModule,
    NzInputModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzMenuModule,
    PloComponentModule
  ]
})
export class SysAdminModule { }
