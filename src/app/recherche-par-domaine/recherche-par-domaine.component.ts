import { Component, OnInit } from '@angular/core';
import { Freelancer } from '../model/freelancer.model';
import { Domaine } from '../model/domaine.model';
import { FreelancerService } from '../services/freelancer.service';
@Component({
  selector: 'app-recherche-par-domaine',
  templateUrl: './recherche-par-domaine.component.html'
})
export class RechercheParDomaineComponent implements OnInit {
  IdDomaine!: number;
  freelancers !: Freelancer[];
  domaines!: Domaine[];
  constructor(private freelancerService: FreelancerService) { }

  ngOnInit(): void {
this.freelancerService.listeDomaines().subscribe(doms => { //list domaine fait appel au backend pour nous ramener la list de tous les doamine 
  this.domaines = doms._embedded.domaines;
  console.log(doms);
});

  }
  onChange(){
this.freelancerService.rechercheParDomaine(this.IdDomaine).subscribe(freel =>{this.freelancers=freel});
  }
}
