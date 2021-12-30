import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'emp-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public empList : Employee[] = [];

  constructor(private service:EmployeeService,private router: Router) { }

  ngOnInit(): void {
    this.refreshTable();
  }

  refreshTable(): void {
    this.service.getAllEmployees().subscribe(empList => {
      this.empList = empList;
      console.log(this.empList);
    },err => {
      console.log("Error in calling Employee service :");
      console.log(err);
    })
  }

  clear(): void {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    this.router.navigate(["login"]);
  }

}
