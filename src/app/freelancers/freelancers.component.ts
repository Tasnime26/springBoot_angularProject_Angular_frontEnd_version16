import { Component, OnInit } from '@angular/core';
import { Freelancer } from '../model/freelancer.model';
import { FreelancerService } from '../services/freelancer.service';
import { AuthService } from '../services/auth.service';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-freelancers',
  templateUrl: './freelancers.component.html',
})
export class FreelancersComponent implements OnInit {
  freelancers?: Freelancer[];
  apiurl: string = 'http://localhost:8080/freelancer/api';
  isLoggedIn: Boolean = false;

  constructor(
    private freelancerService: FreelancerService,
    public authService: AuthService
  ) {
    // this.freelancers=[];
    // this.freelancers= this.freelancerService.listFreelancer();
  }
  ngOnInit(): void {
    this.chargerFreelancer();
    this.isLoggedIn = this.authService.isUserLoggedIn();
  }
  /*chargerFreelancer(){
    this.freelancerService.listFreelancer().subscribe(freel => {
      console.log(freel);
      this.freelancers = freel;
      this.freelancers.forEach((freel) => {
        this.freelancerService
        .loadImage(freel.image.idImage)
        .subscribe((img: Image) => {
          freel.imageStr = 'data:' + img.type + ';base64,' + img.image;
        });
        }); 
});
  }*/
  chargerFreelancer() {
    this.freelancerService.listFreelancer().subscribe((freels) => {
      this.freelancers = freels;
      this.freelancers.forEach((freel) => {
        freel.imageStr =
          'data:' + freel.images[0].type + ';base64,' + freel.images[0].image;
      });
    });
  }
  /*supprimerFreelancer (free:Freelancer){
   // console.log(free);
   let conf = confirm("Etes-vous sûr ?");
if (conf)//egale true
     this.freelancerService.supprimerFreelancer(free);
   
  }*/
  supprimerFreelancer(f: Freelancer) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf)
      this.freelancerService
        .supprimerFreelancer(f.idFreelancer)
        .subscribe(() => {
          console.log('freelancer supprimé');
          this.chargerFreelancer();
        });
  }
}
