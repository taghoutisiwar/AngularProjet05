import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../model/employee.model';
import { Team } from '../model/team.model';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: []
})
export class UpdateEmployeeComponent implements OnInit{
  currentEmployee = new Employee();
  team! : Team[];
  updatedteId! : number;


  constructor(private activatedRoute :ActivatedRoute,
              private router :Router,
              private employeeService : EmployeeService){

  }

  ngOnInit(){
    this.employeeService.listeTeam().
    subscribe(tes => {this.team = tes._embedded.teams;
    console.log(tes);
    });
    
    this.employeeService.consulterEmployee(this.activatedRoute.snapshot.params['id']).subscribe( e =>{ this.currentEmployee = e;
      this.updatedteId = this.currentEmployee.team.idTeam;
       });
  }

  updateEmployee(){
   this.currentEmployee.team = this.team.find(t => t.idTeam == this.updatedteId)!;
   this.employeeService.updateEmployee(this.currentEmployee).subscribe(e => {
    this.router.navigate(['employees']); }
    );
  }

}