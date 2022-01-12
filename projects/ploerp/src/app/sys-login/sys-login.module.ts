import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SysLoginRoutingModule } from './sys-login-routing.module';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SysLoginRoutingModule
  ]
})
export class SysLoginModule { }
