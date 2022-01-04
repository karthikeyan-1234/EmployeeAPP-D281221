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
  public showDetails : boolean = true;
  public detailEmp : Employee = {};

  constructor(public service:EmployeeService,private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.refreshTable();
  }

  refreshTable(): void {
    this.service.getAllEmployees().then(res => {
      this.toastr.success("Employees Loaded..!!","Success..!!");
    },err => {
      console.log("Error in calling Employee service :");
      console.log(err);
      this.router.navigate(['login']);
    })
  }


  edit(emp: Employee): void{

    console.log("Editing Employee : ");
    console.log(emp);

    this.service.addData = emp;
    //this.refreshTable();
  }

  delete(emp: Employee): void{
  }

  showDets(emp: Employee): void{
    this.detailEmp = emp;
  }
}
