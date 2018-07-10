import { IModuleFilters } from "./IModuleFilters";

//old one
// export interface IModule extends IModuleFilters {
//     ModuleId:number,
//     ModuleName:string,
//     Division:string,
//     KPU:string,
//     Application:string,
//     Plateform:string,
//     ModuleReleased:boolean,
//     TemplateModuleValidated:boolean,
//     TotalModuleCount:number
// }

//New one
export interface IModule extends IModuleFilters {
    ARCMModuleGroupId:number,
    ModuleName:string,
    ModuleType:string,
    Plateform:string,
    TotalBaseModuleCount:number
}

