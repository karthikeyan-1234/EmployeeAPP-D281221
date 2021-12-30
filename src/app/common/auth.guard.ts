import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    var token = localStorage.getItem("token");
    var username = localStorage.getItem("username");

    console.log("Route Guard");
    console.log(token);
    console.log(username);

    if(localStorage.getItem("token") && localStorage.getItem("username"))
    return true;

    this.router.navigate(['login']);
    return false;
  }

}
