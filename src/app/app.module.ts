import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './views/employee/list/list.component';
import { AddComponent } from './views/employee/add/add.component';
import { EmployeeService } from './services/employee.service';
import { LoginComponent } from './views/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtInterceptor } from './common/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AddComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [EmployeeService,{
    provide: HTTP_INTERCEPTORS,
    useClass : JwtInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
