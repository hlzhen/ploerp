import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PloPageHeaderComponent } from './plo-page-header/plo-page-header.component';
import { PloPaginationComponent } from './plo-pagination/plo-pagination.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';




@NgModule({
  declarations: [PloPageHeaderComponent, PloPaginationComponent],
  imports: [
    CommonModule,
    NzPaginationModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    FormsModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzButtonModule
  ],
  exports: [PloPageHeaderComponent, PloPaginationComponent]
})
export class PloComponentModule { }
