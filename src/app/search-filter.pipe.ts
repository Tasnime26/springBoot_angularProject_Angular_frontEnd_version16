import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(list: any[], filterText: string): any {
    console.log("tansforming...")
    return list ? list.filter(item => //test si la list nest pas vide 
    item.nomFreelancer.toLowerCase().includes(filterText)) : [];// ca si non il retourne  : [];
    }

}
