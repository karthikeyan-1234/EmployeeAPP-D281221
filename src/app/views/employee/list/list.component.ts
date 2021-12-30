import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'emp-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private service:EmployeeService,private router: Router) { }

  ngOnInit(): void {
    this.service.getAllEmployees().subscribe(res => {
      console.log(res);
    },err => {
      console.log("Error in calling Employee service :");
      console.log(err);
    })
  }

  clear(){
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    this.router.navigate(["login"]);
  }

}
