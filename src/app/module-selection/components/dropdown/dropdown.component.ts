import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'arcm-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit, OnChanges {

  constructor() { }

  @Input() ddOptions: string[] = [];
  @Input() filterName: string;
  @Input() clearDropDown: boolean = false;


  selectedFilterValue: string = "";
  @Output() filterValue: EventEmitter<string> = new EventEmitter<string>();
  data: SelectItem[] = [];// = [   {label:'Select City', value:null},{label:'aa', value:'aaval'},{label:'bb', value:'bbval'},{label:'cccccccc', value:null}];

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    let change = changes['ddOptions'];
    let changeClear = changes['clearDropDown'];

    //console.log(`clearDropDown- changeClear value  :  ${changeClear}`);
    if (changeClear && changeClear != undefined && changeClear.currentValue > 0) {
      this.selectedFilterValue = '';
    }
    
    // console.log("in dropdown comp");
    // console.log(change.currentValue);
    // console.log(change);
    if (change) {
      this.fillDropDown(change.currentValue);
    }

    //}
  }

  private fillDropDown(options: string[]): void {
    options.forEach(option => {
      this.data.push({ label: option, value: option });
    });
  }

  selectedValueChanged(eventLoad: any): void {
    //console.log(eventLoad);
    this.filterValue.emit(eventLoad.value);
  }

}
