import { NgModule } from '@angular/core';

import { LayoutRoutingModule } from './layout-routing.module';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [DashboardLayoutComponent],
  imports: [
    LayoutRoutingModule,
    NgxSpinnerModule,
    

    BsDropdownModule.forRoot(),
  ]
})
export class LayoutModule { }
