

export interface ITechNode{
    Adv_Tech_Node:string,
    Adv_Tech_Node_Value:number
}

export interface IDeviceType{
       ARCM_Device_ID:number,
    Device:string
}

export interface IProcessType{
    
    ARCM_Process_Type_ID:number,
    Process_Type:string
}

export interface IHardwareType{
    ARCM_HW_Type_ID:number,
    HW_Type:string
}
export interface ICustomer{
    customer_code:string,
    CUSTOMER_SHORT_NAME_MARKETING:string
   
}

export interface IRegion{
    Region_ID:number,
    Region_Name:string
   
}



export interface IModuleVariantCollection{
     TechNodeList:ITechNode[],
     DeviceTypeList:IDeviceType[],
     ProcessTypeList:IProcessType[],
     HardwareTypeList:IHardwareType[],
     CustomerList:ICustomer[],
     RegionList:IRegion[]
}