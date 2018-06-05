import { IKeyValue } from "./IKeyValue";

    // export interface IFilter {
    //      page:number,
    //      first: number, 
    //      rows: number, 
    //      pageCount:number
    // }

    export interface IFilterModuleCriteria {
        
        PageNumber: number,
        PageSize: number,
        FilterKey: string,
        SortOrder: string,
        FilterList:IKeyValue[]
        
        }