import { Injectable } from '@angular/core';
import { Employee } from '../model/employee.model';
import { Team } from '../model/team.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { teamWrapper } from '../model/teamWrapped.model';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiURL: string = "http://localhost:8090/employees/api";
  apiURLte: string = "http://localhost:8090/employees/te";

  employees!: Employee[];

  constructor(private http : HttpClient) {
   }

 
  listEmployee(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiURL);
    }
    

  ajouterEmployee( empl: Employee):Observable<Employee>{
    return this.http.post<Employee>(this.apiURL, empl, httpOptions);
  }


  supprimerEmployee(id:number){
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterEmployee(id: number): Observable<Employee> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Employee>(url);
  }
 
  updateEmployee(e:Employee) : Observable<Employee>{
    return this.http.put<Employee>(this.apiURL, e, httpOptions);
  }

  trierEmployees(){
    this.employees = this.employees.sort((n1,n2) => {
    if(n1 .id > n2.id) {
    return 1;
    }
    if (n1.id < n2.id) {
    return -1;
    }
    return 0;
    });
  }
 
  listeTeam():Observable<teamWrapper>{
    return this.http.get<teamWrapper>(this.apiURLte);
  }
     
        
  rechercherParTeam(idTeam: number):Observable< Employee[]> {
    //const url = `${this.apiURL}/${idTeam}`;
    const url = `${this.apiURL}`;
    return this.http.get<Employee[]>(url);
  }

  
  rechercherParNom(nom: string):Observable< Employee[]> {
    const url = `${this.apiURL}/${nom}`;
    return this.http.get<Employee[]>(url);
  } 

  ajouterTeam(te: Team):Observable<Team>{
    return this.http.post<Team>(this.apiURLte, te, httpOptions);
  }


}