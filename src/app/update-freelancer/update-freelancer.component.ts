import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FreelancerService } from '../services/freelancer.service';
import { Freelancer } from '../model/freelancer.model';
import { Domaine } from '../model/domaine.model';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-update-freelancer',
  templateUrl: './update-freelancer.component.html'
})
export class UpdateFreelancerComponent implements OnInit {
currentFreelancer = new Freelancer();
domaines! :Domaine[];
updatedDomId! : number;
myImage! : string;
uploadedImage!: File;
isImageUpdated: Boolean=false;

  constructor(private activatedRoute: ActivatedRoute,
    private router :Router,

    private freelancerService: FreelancerService) { }
    ngOnInit(): void {
      this.freelancerService.listeDomaines().
      subscribe(doms => {this.domaines = doms._embedded.domaines;
      });
      this.freelancerService.consulterFreelancer(this.activatedRoute.snapshot.params['id'])
      .subscribe( freel =>{ this.currentFreelancer = freel;
      this.updatedDomId = freel.domaine.idDom;
      } ) ;
      }
 /* ngOnInit(): void {
    this.freelancerService.listeDomaines().
subscribe(doms => { 
  this.domaines = doms._embedded.domaines;
console.log(doms);
});
    //console.log(this.activatedRoute.snapshot.params['id']);
    
//this.domaines= this.freelancerService.listeDomaines();
    //this.currentFreelancer = this.freelancerService.consulterFreelancer(this.activatedRoute.snapshot.params['id']);
    
   // this.updatedDomId=this.currentFreelancer.domaine.idDom;
   this.freelancerService.consulterFreelancer(this.activatedRoute.snapshot.params['id']).
 subscribe( freel =>{ this.currentFreelancer = freel;
  this.updatedDomId = 
this.currentFreelancer.domaine.idDom;
this.freelancerService.loadImage(this.currentFreelancer.image.idImage).subscribe((img: Image) => {
  this.myImage = 'data:' + img.type + ';base64,' + img.image;
  }); 
 
 } ) ;

 
    //console.log(this.currentFreelancer);
  }*/
  /*updateFreelancer(){
    //console.log(this.currentFreelancer);
  
//this.currentFreelancer.domaine=this.freelancerService.consulterDomaine(this.updatedDomId);
    this.freelancerService.updateFreelancer(this.currentFreelancer);
    this.router.navigate(["freelancers"]);// fy app routing .module
  }*/
  /*updateFreelancer() {
    this.currentFreelancer.domaine = this.domaines.find(dom => dom.idDom == this.updatedDomId)!;
    this.freelancerService.updateFreelancer(this.currentFreelancer).subscribe(freel => {
    this.router.navigate(['freelancers']); //bech narja3 lil home ba3d modifier
  }
    );
    }*/



    updateFreelancer() {
      this.currentFreelancer.domaine = this.domaines.find(dom => dom.idDom == 
      this.updatedDomId)!; 
      this.freelancerService
      .updateFreelancer(this.currentFreelancer)
      .subscribe((freel) => {
      this.router.navigate(['freelancers']);
      });
      }


    /*updateFreelancer() {
      this.currentFreelancer.domaine = this.domaines.find(dom => dom.idDom == 
      this.updatedDomId)!;
      //tester si l'image du produit a été modifiée
      if (this.isImageUpdated)
      { 
      this.freelancerService
      .uploadImage(this.uploadedImage, this.uploadedImage.name)
      .subscribe((img: Image) => {
      this.currentFreelancer.image = img;
      this.freelancerService
      .updateFreelancer(this.currentFreelancer)
      .subscribe((freel) => {
      this.router.navigate(['freelancers']);
      });
      });
      }
      else{ 
      this.freelancerService
      .updateFreelancer(this.currentFreelancer)
      .subscribe((freel) => {
      this.router.navigate(['freelancers']);
      });
      }
      }*/
      




    onImageUpload(event: any) {
      if(event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated =true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => { this.myImage = reader.result as string; };
      }
      }
      onAddImageFreelancer() {
        this.freelancerService
        .uploadImageFreel(this.uploadedImage, 
        this.uploadedImage.name,this.currentFreelancer.idFreelancer)
        .subscribe( (img : Image) => {
        this.currentFreelancer.images.push(img);
        });
        }
        supprimerImage(img: Image){
          let conf = confirm("Etes-vous sûr ?");
          if (conf)
          this.freelancerService.supprimerImage(img.idImage).subscribe(() => {
          //supprimer image du tableau currentProduit.images 
          const index = this.currentFreelancer.images.indexOf(img, 0);
          if (index > -1) {
          this.currentFreelancer.images.splice(index, 1);
          }
          });
          }
          
}
