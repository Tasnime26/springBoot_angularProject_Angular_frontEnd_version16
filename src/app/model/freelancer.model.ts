import { Domaine } from "./domaine.model";
import { Image } from "./image.model";
export class Freelancer {
    idFreelancer! : number;
    nomFreelancer! : string;
    salaireFreelancer! : number;
     dateinscription! : Date ;//! ya3ni ynjm ykoun vide 
     domaine!:Domaine;
     image! : Image ;
imageStr!:string;
images!: Image[];
    }
    