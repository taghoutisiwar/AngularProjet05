import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee.model';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',

})
export class EmployeesComponent implements OnInit{
  
  employees!: Employee[]; 

constructor(private employeeService : EmployeeService, public authService: AuthService,public router:Router){

}

ngOnInit(): void {
  this.chargerEmployees();
}

chargerEmployees(){
  this.employeeService.listEmployee().subscribe(empls => {
  console.log(empls);
  this.employees = empls;
  });
}

supprimerEmployee(e: Employee)
{
  let conf = confirm("Etes-vous sûr ?");
  if (conf)
  this.employeeService.supprimerEmployee(e.id).subscribe(() => {
  console.log("Employee supprimé");
  this.chargerEmployees();
  });
} 

}