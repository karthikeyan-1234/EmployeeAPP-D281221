import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee Manager';

  constructor(private bnIdle: BnNgIdleService, private router: Router){}

  ngOnInit():void{
    this.bnIdle.startWatching(20).subscribe((isTimeOut:boolean) => {
      if(isTimeOut && localStorage.getItem("username")){
        console.log("Timed out. Logging off..");
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        this.router.navigate(['login']);
      }
    })
  }

}
