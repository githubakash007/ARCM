import { ICustomer, ITechNode, IHardwareType, IDeviceType, IProcessType } from "./IModuleVariantCollection";

export interface ISelectedVariant{
    selectedCustomer:ICustomer,
    selectedProcessType:IProcessType,
    selectedDeviceType:IDeviceType,
    selectedHardwareType:IHardwareType,
    selectedTechNode:ITechNode,
    
}