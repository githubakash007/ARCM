import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModuleApiName } from "../module-selection/enum/moduleApiName.enum";
import { apiModuleUrl } from "../shared/enum/featureBasedApiUrl.constant";
import { IModuleSelection } from "../module-selection/modal/IModuleSelection";
import { Observable } from "rxjs/Observable";
import { environment } from "../../environments/environment";
import { IModule } from "../module-selection/modal/IModule";
import { IModuleFilters } from "../module-selection/modal/IModuleFilters";
import { IFilterModuleCriteria } from "../module-selection/modal/IFilterModuleCriteria";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IAddNewModule } from "../module-selection/modal/IAddNewModule";
import { catchError, finalize} from "rxjs/operators";
import { of } from 'rxjs/observable/of';
import { IKeyValue } from "../module-selection/modal/IKeyValue";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ModuleService {

    private moduleSubject = new BehaviorSubject<IModule[]>([]);
    public moduleObservable = this.moduleSubject.asObservable();

    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loadingObservable = this.loadingSubject.asObservable();
    public totalCount: number = 0;
    constructor(private _httpClient: HttpClient) { }


    getModuleSelection(): Observable<IModuleSelection> {
        this.loadingSubject.next(true);
        return this._httpClient.get<IModuleSelection>(this.getRelativeUrl(ModuleApiName.getModuleSelection)).pipe(
            catchError(() => of(null)),
            finalize(() => this.loadingSubject.next(false))
          );
    }

    getModules(inputFilters:IKeyValue[],filterKey = '', sortOrder = 'asc', pageNumber = 0, pageSize = 10): void {
        console.log ("getModules");
        this.loadingSubject.next(true);
        let inputData: IFilterModuleCriteria = { FilterKey: filterKey, PageNumber: pageNumber, PageSize: pageSize, SortOrder: sortOrder,FilterList:inputFilters };
        this._httpClient.post<IModule[]>(this.getRelativeUrl(ModuleApiName.getModules), inputData, httpOptions).pipe(
            catchError(() => of(null)),
            finalize(() => this.loadingSubject.next(false))).subscribe(
            data => this.moduleSubject.next(data));
    }

    getModuleFilters(): Observable<IModuleFilters[]> {
        return this._httpClient.get<IModuleFilters[]>(this.getRelativeUrl(ModuleApiName.GetModuleFilters));
    }

    filterModules(inputFilters:IKeyValue[]): void {
        this.loadingSubject.next(true);
        let inputData: IKeyValue[] = inputFilters;
        // console.log("in filterModules func ");
        // console.log(inputData)
        this._httpClient.post<any>(this.getRelativeUrl(ModuleApiName.filterModule), inputData, httpOptions).pipe(
            catchError(() => of(null)),
            finalize(() => this.loadingSubject.next(false))).subscribe(
            data => this.moduleSubject.next(data)
        );
    }

    addNewModule(segment: string, pbg: string, waferSize: string, moduleName: string, successCallBack: (result: boolean) => void): void {
        let inputData: IAddNewModule = { Segment: segment, PBG: pbg, WaferSize: waferSize, ModuleName: moduleName, SCMTemplateModuleID: 100 };
        this._httpClient.post<boolean>(this.getRelativeUrl(ModuleApiName.addNewModule), inputData, httpOptions).subscribe(
            result => successCallBack(result)
        );
    }


    private getRelativeUrl(relativeUrl: ModuleApiName | string): string {
        let featureUrl = apiModuleUrl;

        return environment.apiBaseUrl + featureUrl + relativeUrl.toString();
    }
}