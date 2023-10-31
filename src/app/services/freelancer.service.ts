import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Freelancer } from '../model/freelancer.model';
import { Domaine } from '../model/domaine.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL } from '../config';
import { DomaineWrapper } from '../model/DomaineWrapped.model';
import { Image } from '../model/image.model';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root'
})
export class FreelancerService {
  apiURLDom: string = 'http://localhost:8080/freelancer/dom';

  freelancers!: Freelancer[];//un tableau de freelancer
  //freelancer! :Freelancer;//!on peut accepter les undefined dans cette variable
  //domaines :Domaine[];
  constructor(private http : HttpClient ,  private authService : AuthService) {
   /*  this.domaines=[{idDom : 1, nomDom : "Development & IT"},
    {idDom : 2, nomDom : "Design"}];  */
   /* this.freelancers =[{idFreelancer : 1, nomFreelancer : "Tasnim Elgarsi", salaireFreelancer : 3000.600, dateInscription : new Date("01/14/2011"),
    domaine:{idDom : 1, nomDom : "Development & IT"}},
    {idFreelancer : 2, nomFreelancer : "Mayssa Elgarsi", salaireFreelancer : 450, dateInscription : new Date("12/17/2010"),
    domaine:{idDom : 2, nomDom : "Design"}},
    {idFreelancer : 3, nomFreelancer :"Youssef Elgarsi", salaireFreelancer : 900.123, dateInscription : new Date("02/20/2020"),
    domaine:{idDom : 2, nomDom : "Design"}}];*/
   }
  /* listFreelancer():Freelancer[]{
    return this.freelancers;*/
    listFreelancer(): Observable<Freelancer[]>{
      /*let jwt = this.authService.getToken();ici je recupere mon jwt
jwt = "Bearer "+jwt;
let httpHeaders = new HttpHeaders({"Authorization":jwt})*/
return this.http.get<Freelancer[]>(apiURL+"/all"/*,{headers:httpHeaders}*/);//une fois j'ai mon httpheader je vais lancer un get 
      }
   //push cest une methode qui permet dajouter un nouvel element a mon tableau 
  /* ajouterFreelancer(freelancer:Freelancer){
this.freelancers.push(freelancer);
   }*/
   ajouterFreelancer( freel: Freelancer):Observable<Freelancer>{//trja3 freelancer wa7ed ama bil api observabledima httpoption constant pour dire que c'estjson 
  
return this.http.post<Freelancer>(apiURL+"/addfreel", freel);
    }
    /*supprimerFreelancer(free:Freelancer){
      //supprimer le produit prod du tableau produits
   const index = this.freelancers.indexOf(free, 0);
   if (index > -1) {
   this.freelancers.splice(index, 1);
   }
   //ou Bien
    this.freelancers.forEach((cur, index) => {
   if(free.idFreelancer === cur.idFreelancer) {
   this.freelancers.splice(index, 1);
   }
   }); 
   
     
      }*/
   supprimerFreelancer(id : number) {
    const url = `${apiURL}/delfreel/${id}`;
return this.http.delete(url);

    
    }
    
  /* consulterFreelancer(id:number): Freelancer{
    return  this.freelancers.find(f => f.idFreelancer == id)!;
    
    }*/
    consulterFreelancer(id: number): Observable<Freelancer> {
      const url = `${apiURL}/getbyid/${id}`;
      return this.http.get<Freelancer>(url);
      
      }
   /* updateFreelancer(f:Freelancer)
{
// console.log(p);
/*this.supprimerFreelancer(f);// je supprime ancien freelancer 
this.ajouterFreelancer(f);// et je ajout le nouveau 
this.trierFreelancers();
}*/
updateFreelancer(f :Freelancer) : Observable<Freelancer>
{
//return this.http.put<Freelancer>(apiURL, f, httpOptions);

return this.http.put<Freelancer>(apiURL+"/updatefreel", f);
}

trierFreelancers() {
  this.freelancers = this.freelancers.sort((n1, n2) => {
    if (n1?.idFreelancer && n2?.idFreelancer) {
      if (n1.idFreelancer > n2.idFreelancer) {
        return 1;
      }
      if (n1.idFreelancer < n2.idFreelancer) {
        return -1;
      }
    }
    return 0;
  });
}
/*trierProduits(){
  this.produits = this.produits.sort((n1,n2) => {
  if (n1.idProduit > n2.idProduit) {
  return 1;
  }
  if (n1.idProduit < n2.idProduit) {
  return -1;
  }
  return 0;
  });
  }*/
 /*  listeDomaines():Domaine[] {
    return this.domaines;
    }

    consulterDomaine(id:number): Domaine{ 
      return this.domaines.find(dom => dom.idDom == id)!;
      } */
      /*listeDomaines():Observable<Domaine[]>{
        return this.http.get<Domaine[]>(apiURL+"/dom");
        }*/
        listeDomaines():Observable<DomaineWrapper>{
//return this.http.get<DomaineWrapper>(this.apiURLDom);

return this.http.get<DomaineWrapper>(this.apiURLDom
);

}
rechercheParDomaine(idDom: number):Observable< Freelancer[]> {
 /* const url = `${apiURL}/freelsdom/${idDom}`;j'ai construire dans url de lapi que je vais appeler qui va me retourner les freelancer dun domaine determiner 
  return this.http.get<Freelancer[]>(url);*/
  const url = `${apiURL}/prodscat/${idDom}`;
return this.http.get<Freelancer[]>(url);
  }
  
  rechercherParNom(nom: string):Observable< Freelancer[]> {
    /*const url = `${apiURL}/freelsByName/${nom}`;
    return this.http.get<Freelancer[]>(url);*/
    const url = `${apiURL}/freelsByName/${nom}`;
return this.http.get<Freelancer[]>(url)
    }
    ajouterDomaine( dom: Domaine):Observable<Domaine>{
      return this.http.post<Domaine>(this.apiURLDom, dom, httpOptions);
      
      }
      uploadImage(file: File, filename: string): Observable<Image>{
        const imageFormData = new FormData();
        imageFormData.append('image', file, filename);
        const url = `${apiURL + '/image/upload'}`;
        return this.http.post<Image>(url, imageFormData);
        }
        loadImage(id: number): Observable<Image> {
        const url = `${apiURL + '/image/get/info'}/${id}`;
        return this.http.get<Image>(url);
        }
        uploadImageFreel(file: File, filename: string, idFreel:number): Observable<any>{
          const imageFormData = new FormData();
          imageFormData.append('image', file, filename);
          const url = `${apiURL + '/image/uplaodImageFreel'}/${idFreel}`;
          return this.http.post(url, imageFormData);
          }
          supprimerImage(id : number) {
            const url = `${apiURL}/image/delete/${id}`;
            return this.http.delete(url, httpOptions);
            }
            


            uploadImageFS(file: File, filename: string, idFreel : number): Observable<any>{
              const imageFormData = new FormData();
              imageFormData.append('image', file, filename);
              const url = `${apiURL + '/image/uploadFS'}/${idFreel}`;
              return this.http.post(url, imageFormData);
              }

}
