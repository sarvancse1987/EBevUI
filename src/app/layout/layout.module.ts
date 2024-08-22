import { NgModule } from '@angular/core';

import { LayoutRoutingModule } from './layout-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DashboardLayoutComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NgxSpinnerModule,
    BsDropdownModule.forRoot(),
  ]
})
export class LayoutModule { }
