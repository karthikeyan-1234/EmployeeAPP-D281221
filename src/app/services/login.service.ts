import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private http: HttpClient;
  private baseUrl: string = "https://localhost:5021/ocelot";

  constructor(private handler: HttpBackend) { this.http = new HttpClient(handler) }

  checkLogin(username: string,password: string):Observable<any>{
    return this.http.get<any>(this.baseUrl + "/GetToken?" + "username=" + username + "&password=" + password);
  }

  refreshLogin(username:string):Observable<any>{
    return this.http.get<any>(this.baseUrl + "/RefreshToken?" + "username=" + username);
  }

}
