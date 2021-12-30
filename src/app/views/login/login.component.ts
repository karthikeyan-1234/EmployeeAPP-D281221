import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private service:LoginService,private router:Router) { }

  ngOnInit(): void {
    this.showError = false;
    this.username = "karthikeyan.n";
    this.password = "123456";
  }

  checkLogin(){
    this.service.checkLogin(this.username,this.password).subscribe(res => {
      if(res == null){
        alert("Invalid password..!!");
        this.showError = true;
      }
      else
      {
        localStorage.setItem("username",this.username);
        console.log("Setting token for the first time : ");
        console.log(res);
        localStorage.setItem("token",JSON.stringify(res));
        this.router.navigate(['emp-list']);
      }

    },err => {

    })
  }

}
