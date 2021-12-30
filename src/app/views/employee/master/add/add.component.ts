import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(public service:EmployeeService, public toaster: ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form ?: NgForm){
    if(form != null)
      form.resetForm();
    this.service.employeeData = {};
  }

  onSubmit(form ?: NgForm){
    this.service.addEmployee(form?.value).subscribe(res => {
      this.toaster.success("Employee added..!!","Employee");
      this.resetForm(form);
      console.log("Employee Added sucessfully");
      console.log(res);

      this.service.getAllEmployees().then(res => {
        this.toaster.success("Employee list refreshed..!!")
      },err => {
        this.toaster.error("Unable to update Employee list..!!")
      })

    },err => {
      this.toaster.error("Unable to add employee..!!","Employee");
      console.log("Unable to add employee");
      console.log(err);
    });
  }

}
