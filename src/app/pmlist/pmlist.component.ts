import { Component, OnInit, Input,Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { IModulePM } from '../modal/IModuleDetail';

@Component({
  selector: 'pm-list',
  templateUrl: './pmlist.component.html',
  styleUrls: ['./pmlist.component.css']
})
export class PmlistComponent implements OnInit,OnChanges {

  @Input() pmlist:IModulePM[] = [];
  // @Output() PMChange =  new EventEmitter<string>();
 
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes:SimpleChanges):void{
    // let pmListChanges = changes["pmlist"];
    // if(pmListChanges){
    //   this.pmlist =  pmListChanges.currentValue;
    // }
}

removePM(e:IModulePM):void{
  this.pmlist.splice(this.pmlist.indexOf(e),1);
  console.log(e);

}

// filterParts(pmName:string):void{
//     if(pmName){
//       console.log(`pm name is ${pmName}`);
//       this.PMChange.emit(pmName);
//     }
// }

}
