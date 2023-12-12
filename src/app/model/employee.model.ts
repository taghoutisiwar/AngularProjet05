import { Team } from "./team.model";

export class Employee {
    id! : number;
    nom! : string;
    prenom! : string;
    salaire! : number ;
    dateRec! : Date ; 
    team! : Team;
}