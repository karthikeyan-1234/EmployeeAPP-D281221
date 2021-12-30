import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee Manager';

  constructor(private bnIdle: BnNgIdleService, private router: Router, private toaster:ToastrService){}

  ngOnInit():void{
    this.bnIdle.startWatching(2000).subscribe((isTimeOut:boolean) => {
      if(isTimeOut && localStorage.getItem("username")){
        this.toaster.warning("Timed out..!!","Log Off");
        console.log("Timed out. Logging off..");
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        this.router.navigate(['login']);
      }
    })
  }

}
