import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string = "";
  public password: string = "";
  public showError: boolean = false;

  constructor(private service:LoginService,private router:Router,private toaster:ToastrService) { }

  ngOnInit(): void {

    if(localStorage.getItem("username") && localStorage.getItem("token"))
      this.router.navigate(['emp-master']);

    this.showError = false;
    this.username = "karthikeyan.n";
    this.password = "123456";
  }

  checkLogin(){
    this.service.checkLogin(this.username,this.password).subscribe(res => {
      if(res == null){
        this.toaster.error("Login failure. Wrong credentials.","Login..!!!",{timeOut : 1500});
      }
      else
      {
        this.toaster.success("Login success","Login..!!!",{timeOut : 1500});
        localStorage.setItem("username",this.username);
        console.log("Setting token for the first time : ");
        console.log(res);
        localStorage.setItem("token",JSON.stringify(res));
        this.router.navigate(['emp-master']); //emp-list
      }

    },err => {
      this.toaster.error("Unable to reach API","API Error..!!");
    })
  }

}
