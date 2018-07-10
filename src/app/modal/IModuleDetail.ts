import { ITechNode, IDeviceType, IProcessType, IHardwareType, ICustomer } from "./IModuleVariantCollection";

export interface IModulePM{
    ARCM_Module_PM_ID:number,
    ARCM_Module_ID:number,
    PM_Name:string,
    PM_Labor_Level:string,
    Trigger_Name:string,
    Edit_PM_Frequency:boolean
}

export interface IModulePart{
    PM_Name:string,
    PartNumber:string,
    ARCM_Module_PM_ID:number,
    ARCM_Module_ID:number[],
    Description:string,
    Trigger_Name:string,
    Replace_Cost:number,
    Refurb_Cost:number,
    Cleaning_Cost:number
}

export interface IModuleDetail extends ITechNode,IDeviceType,IProcessType,IHardwareType,ICustomer {
    ARCM_Module_Group_ID:number,
    ARCM_Module_ID:number,
    Module_Name:string,
    Module_Released:boolean,
    Module_Validated:boolean,
    ModuleVariantList:number[],
    PMList:IModulePM[],
    PartList:IModulePart[],
    Copied_From_Module_ID?:number;
    Cost_Model_Name:string
}

