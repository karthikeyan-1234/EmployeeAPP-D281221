import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './views/employee/master/list/list.component';
import { AddComponent } from './views/employee/master/add/add.component';
import { EmployeeService } from './services/employee.service';
import { LoginComponent } from './views/employee/master/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtInterceptor } from './common/jwt.interceptor';
import { MasterComponent } from './views/employee/master/master.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AddComponent,
    LoginComponent,
    MasterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [EmployeeService,{
    provide: HTTP_INTERCEPTORS,
    useClass : JwtInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
