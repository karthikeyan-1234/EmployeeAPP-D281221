import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './common/auth.guard';
import { ListComponent } from './views/employee/master/list/list.component';
import { LoginComponent } from './views/employee/master/login/login.component';
import { MasterComponent } from './views/employee/master/master.component';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"login", component:LoginComponent},
  {path:"emp-master", component:MasterComponent},
  {path:"emp-list", component:ListComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
