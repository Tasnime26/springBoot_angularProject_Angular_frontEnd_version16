import { Component, OnInit } from '@angular/core';
import { FreelancerService } from '../services/freelancer.service';
import { Domaine } from '../model/domaine.model';

@Component({
  selector: 'app-liste-domaines',
  templateUrl: './liste-domaines.component.html'
 
})
export class ListeDomainesComponent implements OnInit {
  domaines! :Domaine[];
  updatedDom:Domaine = {"idDom":0,"nomDom":""};
  ajout:boolean=true;

  constructor(private freelancerService: FreelancerService) { }

  ngOnInit(): void {

this.chargerDomaines();
  }
  chargerDomaines(){
    this.freelancerService.listeDomaines().
subscribe(doms => {this.domaines = doms._embedded.domaines;
console.log(doms);
});


  }
  domaineUpdated(dom:Domaine){
console.log("domaine recu de composant updateDomaine",dom);
this.freelancerService.ajouterDomaine(dom).
 subscribe( ()=> this.chargerDomaines());//charger pour charger de la base et ajouter a mon tableau
  }
  updateDom(dom: Domaine){
this.updatedDom=dom;
this.ajout=false; 
  }
}
