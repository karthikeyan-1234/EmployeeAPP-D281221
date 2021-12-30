import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'emp-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public empList : Employee[] = [];

  constructor(public service:EmployeeService,private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.refreshTable();
  }

  refreshTable(): void {
    this.service.getAllEmployees().then(empList => {
      this.toastr.success("Employees Loaded..!!","Success..!!");
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
