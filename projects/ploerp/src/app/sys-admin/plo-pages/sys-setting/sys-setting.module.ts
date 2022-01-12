import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SysSettingRoutingModule } from './sys-setting-routing.module';
import { MenuListComponent } from './menu-list/menu-list.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PloComponentModule } from '../../plo-component/plo-component.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { DruidComponent } from './druid/druid.component';


@NgModule({
  declarations: [MenuListComponent, DruidComponent],
  imports: [
    CommonModule,
    SysSettingRoutingModule,
    NzIconModule,
    PloComponentModule,
    NzTableModule,
    NzTagModule,
    NzSpaceModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzModalModule
  ],
})
export class SysSettingModule { }
