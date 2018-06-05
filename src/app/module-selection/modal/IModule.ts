import { IModuleFilters } from "./IModuleFilters";

export interface IModule extends IModuleFilters {
    ModuleId:number,
    ModuleName:string,
    Division:string,
    KPU:string,
    Application:string,
    Plateform:string,
    ModuleReleased:boolean,
    TemplateModuleValidated:boolean,
    TotalModuleCount:number
}

