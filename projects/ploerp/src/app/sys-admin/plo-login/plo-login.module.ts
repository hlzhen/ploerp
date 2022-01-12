import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PloLoginRoutingModule } from './plo-login-routing.module';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    PloLoginRoutingModule
  ]
})
export class PloLoginModule { }
