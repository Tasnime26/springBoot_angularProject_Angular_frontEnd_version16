import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Domaine } from '../model/domaine.model';

@Component({
  selector: 'app-update-domaine',
  templateUrl: './update-domaine.component.html'
 
})
export class UpdateDomaineComponent implements OnInit {
  @Input() //input comme un parametre pour un composant 
  domaine! : Domaine;
  @Output() 
  domaineUpdated = new EventEmitter<Domaine>();
  @Input()
ajout! :boolean;
  constructor() { }

  ngOnInit(): void {
    console.log("ngOnInit du composant updatedDom ",this.domaine);
  }
  saveDomaine(){
    this.domaineUpdated.emit(this.domaine);//je vais retourner un objet de type domaine qui est this.domaine
  }

}
