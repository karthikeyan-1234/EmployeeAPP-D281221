import { Injectable } from '@angular/core';
import { HttpRequest,HttpHandler,HttpEvent,HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators'
import { TokenInfo } from './token-info.model';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private tokenInfo!: TokenInfo;
  private isRefreshing: boolean = false;
  private username: string = "";

  constructor(private router: Router,private service: LoginService) {}

  public isElapsed(fromDate: any, toDate: any):boolean
  {
    console.log("Token Expires at - " + Date.parse(fromDate));
    console.log("vs");
    console.log("Current Time     - " + Date.parse(toDate));
    return Date.parse(fromDate) > Date.parse(toDate);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    var tokenInfo_str = localStorage.getItem("token") as string;

      this.tokenInfo =  <TokenInfo> JSON.parse(tokenInfo_str);
      console.log(this.tokenInfo);
      this.username = localStorage.getItem("username") as string;

      var new_request = request.clone({
          setHeaders:{
            "Authorization": 'Bearer ' + this.tokenInfo.token
          }
        });


       return next.handle(new_request).pipe(catchError(err => {
        if (err instanceof HttpErrorResponse){
          if(err.status == 401)
          {
            console.log("Token Expired. Refreshing token..!!")
            return this.RefreshToken(request,next);
          }
          this.ClearLocalStorage();
          return next.handle(request);
        }
        else
        {
          this.ClearLocalStorage();
          return next.handle(request);
        }

       }));

  }

  RefreshToken(request: HttpRequest<unknown>, next: HttpHandler):Observable<HttpEvent<any>>{

    return this.service.refreshLogin(this.username).pipe(switchMap((newToken: TokenInfo) => {
      if (newToken) {
        console.log("Refreshed token :");
        console.log(newToken.token);
        var new_request = request.clone({
          setHeaders: {
            "Authorization": 'Bearer ' + newToken.token
          }
        });
        localStorage.setItem("token",JSON.stringify(newToken));
        return next.handle(new_request);
      }
      localStorage.removeItem("token");
      this.router.navigate(['']);
      return next.handle(request);
    }));

  }


  ClearLocalStorage(){
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    this.router.navigate(['']);

  }
}


