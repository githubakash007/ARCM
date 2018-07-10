import { Component, OnInit, OnChanges, Input, SimpleChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModuleService } from '../services/module.service';
import { IModuleDetail } from '../modal/IModuleDetail';
import { IHardwareType, IDeviceType, IProcessType, ICustomer, ITechNode, IModuleVariantCollection, IRegion } from '../modal/IModuleVariantCollection';
import { ISaveModule } from '../modal/ISaveModule';
import { ISelectedVariant } from '../modal/IselectedVariant';
import { NotificationService } from '../shared/service/notification.service';
import * as _ from 'lodash';

@Component({
  selector: 'base-module',
  templateUrl: './basemodule.component.html',
  styleUrls: ['./basemodule.component.css']
})
export class BaseModuleComponent implements OnInit, OnChanges {

  constructor(private _moduleService: ModuleService, private _notification: NotificationService) { }
  @Input() moduleDetail: IModuleDetail;
  editVariant: boolean = false;
  hardwareTypeList: IHardwareType[] = [];
  deviceTypeList: IDeviceType[] = [];
  processTypeList: IProcessType[] = [];
  customerList: ICustomer[] = [];
  techNodeList: ITechNode[] = [];
  variantList: IModuleVariantCollection;
  selectedVariants: ISelectedVariant = {} as ISelectedVariant;
  onEditVariants: ISelectedVariant = {} as ISelectedVariant;
  saveModule: ISaveModule = <ISaveModule>{};
  distictPMList: string[] = [];
  copyOfModuleDetailObj: IModuleDetail = undefined;
  saveVariantBtnEnabled: boolean = false;
  @Input() moduleGroupId: number;
  @Output() onCopy = new EventEmitter<IModuleDetail>();
  @Output() validateOnSave = new EventEmitter<IModuleDetail>();
  @Output() onSuccessfulSave = new EventEmitter<IModuleDetail>();

  @ViewChild("validationDialog") validationDialog;

  ngOnInit() {
    // this._moduleService.getModuleDetail(this.moduleGroupId).subscribe(
    //   // result => {
    //   //   console.log("ModuleDetails arrived");
    //   //   console.log(result);
    //   //   this.moduleDetailList = result;

    //     result.PMList.filter((x,i) => {
    //       if(this.distictPMList.indexOf(x.PM_Name) === -1){
    //         this.distictPMList.push(x.PM_Name);
    //       }
    //     } );
    //   }
    // )

  }

  ngOnChanges(change: SimpleChanges): void {

    let moduleDetail = change['moduleDetail'];
    if (moduleDetail && moduleDetail != undefined && !(Object.keys(moduleDetail.currentValue).length === 0 && moduleDetail.currentValue.constructor === Object)) {
      // console.log("helloooooooooo");
      console.log(moduleDetail.currentValue);
      console.log(<IModuleDetail>(moduleDetail.currentValue));
      if (<IModuleDetail>(moduleDetail.currentValue).PMList) {
        (<IModuleDetail>(moduleDetail.currentValue)).PMList.filter((x, i) => {
          if (this.distictPMList.indexOf(x.PM_Name) === -1) {
            this.distictPMList.push(x.PM_Name);
          }
        });
      }
    }


  }

  copyFromThisModule(e: any): void {
    this.onCopy.emit(Object.assign({},this.moduleDetail));
  }



  onEdit(e: any) {

    //create an copy of ModuleDetail Obj
    this.copyOfModuleDetailObj = Object.assign({}, this.moduleDetail);

    this.saveVariantBtnEnabled = true;

    this._moduleService.getModuleVariantColl().subscribe(variantList => {
      if (variantList) {
        this.variantList = variantList;
        const { customer_code, CUSTOMER_SHORT_NAME_MARKETING } = this.moduleDetail || <IModuleDetail>{};
        //const {cust:ICustomer} =  this.moduleDetail;
        let temp = { "customer_code": customer_code, "CUSTOMER_SHORT_NAME_MARKETING": CUSTOMER_SHORT_NAME_MARKETING };
        if (variantList.CustomerList.find(x => x.customer_code === customer_code)) {
          console.log("temp = ")
          console.log(temp);
          this.selectedVariants.selectedCustomer = temp;
          this.saveModule.customer_code = temp.customer_code;
        }

        if (this.moduleDetail.ARCM_Process_Type_ID) {
          this.selectedVariants.selectedProcessType = this.variantList.ProcessTypeList.find(x => x.ARCM_Process_Type_ID === this.moduleDetail.ARCM_Process_Type_ID);
          this.saveModule.ARCM_Process_Type_ID = this.moduleDetail.ARCM_Process_Type_ID;
        }

        if (this.moduleDetail.ARCM_Device_ID) {
          this.selectedVariants.selectedDeviceType = this.variantList.DeviceTypeList.find(x => x.ARCM_Device_ID === this.moduleDetail.ARCM_Device_ID);
          this.saveModule.ARCM_Device_ID = this.moduleDetail.ARCM_Device_ID;
        }

        if (this.moduleDetail.ARCM_HW_Type_ID) {
          this.selectedVariants.selectedHardwareType = this.variantList.HardwareTypeList.find(x => x.ARCM_HW_Type_ID === this.moduleDetail.ARCM_HW_Type_ID);
          this.saveModule.ARCM_HW_Type_ID = this.moduleDetail.ARCM_HW_Type_ID;
        }

        this.selectedVariants.selectedTechNode =
          this.variantList.TechNodeList.find(x => x.Adv_Tech_Node === this.moduleDetail.Adv_Tech_Node && x.Adv_Tech_Node_Value === this.moduleDetail.Adv_Tech_Node_Value);

        this.saveModule.Adv_Tech_Node = this.moduleDetail.Adv_Tech_Node;
        this.saveModule.Adv_Tech_Node_Value = this.moduleDetail.Adv_Tech_Node_Value;
        console.log("selectedVariants = ")
        console.log(this.selectedVariants);
        //    this.customerList = variantList.CustomerList;
        //    console.log(this.customerList);
        //    this.processTypeList = variantList.ProcessTypeList;
        //    this.hardwareTypeList=  variantList.HardwareTypeList;
        //    this.deviceTypeList = variantList.DeviceTypeList;
        //    this.techNodeList = variantList.TechNodeList;

      }
    });
    this.editVariant = true;

  }

  onCancelEdit(e: any): void {
    this.copyOfModuleDetailObj = undefined;
    this.editVariant = false;
    this.saveVariantBtnEnabled = false;
  }

  onSaveModule(e: any) {

    this.saveVariantBtnEnabled = false;

    //TODO: optimized this if-else logic later
    if (this.moduleDetail.ARCM_Module_ID === null) { //it is copied one and has not been saved yet

      this.copyOfModuleDetailObj.PartList = this.moduleDetail.PartList;
      this.copyOfModuleDetailObj.PMList = this.moduleDetail.PMList;
      this.moduleDetail = Object.assign({}, this.copyOfModuleDetailObj);
      if (this.isModuleConfigurationUnique(this.moduleDetail)) {
        this._moduleService.addNewModuleVariant(this.moduleDetail).subscribe(
          result => {
            if (result) {
              this.moduleDetail = result;
              this.editVariant = false;
              this.copyOfModuleDetailObj = undefined;
              this.onSuccessfulSave.emit(this.moduleDetail);
              this._moduleService.updateModuleListValue(this.moduleDetail);
              this._notification.success("Variants saved locally successfully !!")
            }
          });
      }
      else {
        this.saveVariantBtnEnabled = true;
        //TODO: optimize and structure this code
        document.getElementById("validationMessage").innerHTML = "Same Configuration already exist.";
        this.showDialog(undefined);
      }

      //reset the flags


      // if (this.onEditVariants.selectedDeviceType) {
      //   this.moduleDetail.ARCM_Device_ID = this.onEditVariants.selectedDeviceType.ARCM_Device_ID;
      //   this.moduleDetail.Device = this.onEditVariants.selectedDeviceType.Device;
      // }
      // if (this.onEditVariants.selectedCustomer) {
      //   this.moduleDetail.customer_code = this.onEditVariants.selectedCustomer.customer_code;
      //   this.moduleDetail.CUSTOMER_SHORT_NAME_MARKETING = this.onEditVariants.selectedCustomer.CUSTOMER_SHORT_NAME_MARKETING;
      // }
      // if (this.onEditVariants.selectedHardwareType) {
      //   this.moduleDetail.ARCM_HW_Type_ID = this.onEditVariants.selectedHardwareType.ARCM_HW_Type_ID;
      //   this.moduleDetail.HW_Type = this.onEditVariants.selectedHardwareType.HW_Type;
      // }
      // if (this.onEditVariants.selectedProcessType) {
      //   this.moduleDetail.ARCM_Process_Type_ID = this.onEditVariants.selectedProcessType.ARCM_Process_Type_ID;
      //   this.moduleDetail.Process_Type = this.onEditVariants.selectedProcessType.Process_Type;
      // }
      // if (this.onEditVariants.selectedTechNode) {
      //   this.moduleDetail.Adv_Tech_Node = this.onEditVariants.selectedTechNode.Adv_Tech_Node;
      //   this.moduleDetail.Adv_Tech_Node_Value = this.onEditVariants.selectedTechNode.Adv_Tech_Node_Value;
      // }

    }
    else {

      //let module: ISaveModule = this.saveModule;
      if (this._moduleService.isModuleConfigurationUnique(this.copyOfModuleDetailObj)) {
        let module: ISaveModule = this.copyOfModuleDetailObj;

        //module.ARCM_Module_ID = this.moduleDetail.ARCM_Module_ID;
        //module.ARCM_Module_Group_ID = this.moduleDetail.ARCM_Module_Group_ID;
        this._moduleService.saveModule(module).subscribe(
          result => {
            console.log("Module has been saved");
            console.log(result);
            this.moduleDetail = result;
            this.editVariant = false;
            this.copyOfModuleDetailObj = undefined;
            this.onSuccessfulSave.emit(this.moduleDetail);
            this._moduleService.updateModuleListValue(this.moduleDetail);
            this._notification.success("Variants saved successfully");
          }
        );
      }
      else {
        this.saveVariantBtnEnabled = true;
        this.showDialog(undefined);
      }
    }
  }

  isModuleConfigurationUnique(moduleDetail: IModuleDetail): boolean {
    return this._moduleService.isModuleConfigurationUnique(moduleDetail);
  }

  HWSelectionChange(value: IHardwareType): void {
    // this.saveModule.ARCM_HW_Type_ID = value.ARCM_HW_Type_ID;
    this.onEditVariants.selectedHardwareType = value;
    this.copyOfModuleDetailObj.ARCM_HW_Type_ID = value.ARCM_HW_Type_ID;
    this.copyOfModuleDetailObj.HW_Type = value.HW_Type;
  }


  deviceSelectionChange(value: IDeviceType): void {
    //this.saveModule.ARCM_Device_ID = value.ARCM_Device_ID;
    this.onEditVariants.selectedDeviceType = value;
    this.copyOfModuleDetailObj.ARCM_Device_ID = value.ARCM_Device_ID;
    this.copyOfModuleDetailObj.Device = value.Device;
  }

  regionSelectionChange(value: IRegion): void {
    //filter the customer and rebind the customer dropdown. we do not need to store region in the IModuleDetail.
    
  }

  techNodeSelectionChange(value: ITechNode): void {
    //this.saveModule.Adv_Tech_Node_Value = value.Adv_Tech_Node_Value;
    //this.saveModule.Adv_Tech_Node = value.Adv_Tech_Node;
    this.onEditVariants.selectedTechNode = value;
    this.copyOfModuleDetailObj.Adv_Tech_Node = value.Adv_Tech_Node;
    this.copyOfModuleDetailObj.Adv_Tech_Node_Value = value.Adv_Tech_Node_Value;
  }

  processSelectionChange(value: IProcessType): void {
    //this.saveModule.ARCM_Process_Type_ID = value.ARCM_Process_Type_ID;
    this.onEditVariants.selectedProcessType = value;
    this.copyOfModuleDetailObj.ARCM_Process_Type_ID = value.ARCM_Process_Type_ID;
    this.copyOfModuleDetailObj.Process_Type = value.Process_Type;
  }

  public customerSelectionChange(value: ICustomer): void {
    //this.saveModule.customer_code = value.customer_code;
    this.onEditVariants.selectedCustomer = value;
    this.copyOfModuleDetailObj.customer_code = value.customer_code;
    this.copyOfModuleDetailObj.CUSTOMER_SHORT_NAME_MARKETING = value.CUSTOMER_SHORT_NAME_MARKETING;
    // let x:ICustomer | IProcessType = value;

    // console.log(x);
    // console.log(typeof(x));


    // if (this.checkType<ICustomer>(value,{customer_code:'',CUSTOMER_SHORT_NAME_MARKETING:''})) {

    //   console.log("yes, this is a customer");

    // }

    // if (this.isCustomer<IProcessType>(value)) {

    //   console.log("yes, this is a process type");

    // }
    // console.log('selectionChange', value);
  }


  showDialog(e: any): void {
    if (e !== undefined) {
      e.preventDefault();
    }

    this.validationDialog.show();
  }
  hideDialog(e: any): void {
    if (e !== undefined) {
      e.preventDefault();
    }
    this.validationDialog.hide(e);
  }


  saveNotes(e: any, commentText: string): void {
    e.preventDefault();
    if (commentText) {
      this._moduleService.saveComment(commentText);
    }
    else {
      //TODO: optimize and structure this code
      document.getElementById("validationMessage").innerHTML = "Please enter some comments before saving !!";
      this.showDialog(undefined);
    }
  }

  saveCostModalValidatedStatus(): void {

  }

  saveCostModalReleasedStatus(): void {

  }

  isCustomer<T>(input: any): boolean {
    console.log(<T>input);
    console.log(typeof <T>input);
    return (<T>input !== undefined);
  }

  checkType<T>(input: any, sample: T, strict = false, recursive = true): boolean {

    console.log("inside");
    console.log(sample);
    for (let key of Object.getOwnPropertyNames(sample)) {
      if (input[key] !== sample[key]) return false;
      // if(recursive && typeof s[key] == "object" && !is(o[key], s[key], strict, recursive)) return false;
    }
    // We check that o does not have any extra prperties to sample
    if (strict) {
      for (let key of Object.getOwnPropertyNames(input)) {
        if (sample[key] == null) return false;
      }
    }
  }
}
