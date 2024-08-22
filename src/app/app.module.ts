import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { AccountHttpInterceptor, HttpService } from './Shared/helpers/http-service';
import { SharedModule } from './Shared/shared.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    //BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgSelectModule,
    LayoutModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [HttpService, DatePipe, {
    provide: HTTP_INTERCEPTORS,
    useClass: AccountHttpInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
