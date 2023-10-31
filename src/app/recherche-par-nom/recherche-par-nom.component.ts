import { Component, OnInit } from '@angular/core';
import { Freelancer } from '../model/freelancer.model';
import { FreelancerService } from '../services/freelancer.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
 
})
export class RechercheParNomComponent implements OnInit {
  nomFreelancer!:string;
  freelancers !: Freelancer[];
  allFreelancers!: Freelancer[];
  searchTerm!:string;
  constructor(private freelancerService: FreelancerService) { }

  ngOnInit(): void {
    this.freelancerService.listFreelancer().subscribe(freel => {
      console.log(freel);
      //this.allFreelancers = freel;
      this.freelancers = freel;
      });
  }
  rechercherFreels(){
 
    this.freelancerService.rechercherParNom(this.nomFreelancer).
    subscribe(freels=>{
      console.log(freels);
      this.freelancers= freels;//cest un observable 3la haka je lance observable 
      });
    
  }
  onKeyUp(filterText : string){
    this.freelancers = this.allFreelancers.filter(item =>
    item.nomFreelancer.toLowerCase().includes(filterText));
    }
}
