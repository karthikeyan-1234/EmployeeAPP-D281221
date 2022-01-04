import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Employee } from '../models/employee';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employeeData: Employee;
  addData: Employee;
  employeeList: Employee[];

  constructor(  private http: HttpClient) {
    this.employeeData = {};
    this.addData = {};
    this.employeeList = [];
   }

getAllEmployees(){
   return this.http.get<Employee[]>("https://localhost:5021/ocelot/Employee/GetAllEmployees")
  .toPromise().then(res => this.employeeList = res as Employee[]);
  /*.pipe(
    map((data:Employee[]) => { this.employeeList = data; return data;}),
    catchError(error => {return throwError("Something Wrong..!!");})
  );*/
}

addEmployee(empData ?: Employee){
  console.log("Adding Employee..!!");
  console.log(empData);
  return this.http.post("https://localhost:5021/ocelot/Employee/AddEmployee",empData)
}

updateEmployee(empData ?: Employee){
  console.log("Updating Employee..!!");
  console.log(empData);
  return this.http.put("https://localhost:5021/ocelot/Employee/UpdateEmployee",empData);
}

}
