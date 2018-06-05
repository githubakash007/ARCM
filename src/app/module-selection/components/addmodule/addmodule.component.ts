import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FilterName } from '../../enum/filterName.enum';
import { ModuleService } from '../../../services/module.service';
import { NotificationService } from '../../../shared/service/notification.service';

@Component({
  selector: 'arcm-addmodule',
  templateUrl: './addmodule.component.html',
  styleUrls: ['./addmodule.component.css']
})
export class AddmoduleComponent implements OnInit {

  constructor(private _moduleService: ModuleService,private _notificationService:NotificationService) { }

  @Input() segmentFilterValues: string[] = [];
  @Input() pbgFilterValues: string[] = [];
  @Input() waferSizeFilterValues: string[] = [];

  @Output() hideDialog:EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() reloadGrid:EventEmitter<boolean> = new EventEmitter<boolean>();

  segmentFilterSelectedValues:string;
  waferSizeFilterSelectedValues:string;
  pbgFilterSelectedValues:string;
  moduleName:string;
  FilterName:any = Object.assign({},FilterName);

  ngOnInit() {
  }

  filterData(selectedValue: any,filterType:any): void {
   // console.log(selectedValue);
    //console.log(filterType);
    if(filterType == FilterName.Segment){
         this.segmentFilterSelectedValues =  selectedValue;
    }
    else if(filterType == FilterName.PBG){
      this.pbgFilterSelectedValues = selectedValue;

    }
    else if(filterType == FilterName.WaferSize){
      this.waferSizeFilterSelectedValues = selectedValue;
    }

  }

  cancelAddingModule(e:any):void{
    this.hideDialog.emit(true);
    this.reloadGrid.emit(false);
  }

  addNewModule(moduleName:string):void{
    if(moduleName){
      //console.log(moduleName);
       this._moduleService.addNewModule(this.segmentFilterSelectedValues,this.pbgFilterSelectedValues,this.waferSizeFilterSelectedValues,moduleName,this.processResult.bind(this));
    }
  }

  private processResult(result: boolean): void {
    if (result === true) {
      this._notificationService.success("Module added successfully !!");
      this.hideDialog.emit(result);
      this.reloadGrid.emit(result);
    }
    else {
      this.hideDialog.emit(result);
      this.reloadGrid.emit(result);
      this._notificationService.error("Error adding new module. please contact ARCM support team!");
    }

  }

}
