import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IModuleVariantCollection } from "../modal/IModuleVariantCollection";
import { Observable } from "rxjs/Observable";
import { ModuleApiName } from "../module-selection/enum/moduleApiName.enum";
import { apiModuleUrl } from "../shared/constant/featureBasedApiUrl.constant";
import { environment } from "../../environments/environment";
import { catchError, finalize } from "rxjs/operators";
import { of } from 'rxjs/observable/of';
import { IModuleDetail } from "../modal/IModuleDetail";
import { ISaveModule } from "../modal/ISaveModule";
import * as _ from 'lodash';
import { BehaviorSubject } from "rxjs/BehaviorSubject";


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class ModuleService {

    allModulesForGroup: IModuleDetail[] = [];
    moduleListSource = new BehaviorSubject<IModuleDetail[]>(undefined);
    moduleListSourceObservable = this.moduleListSource.asObservable();

    constructor(private _httpClient: HttpClient) { }


    getModuleVariantColl(): Observable<IModuleVariantCollection> {


        //this.loadingSubject.next(true);
        return this._httpClient.get<IModuleVariantCollection>(this.getRelativeUrl(ModuleApiName.getModuleVariantList)).pipe(
            catchError(() => of(null)),
            finalize(() => console.log("variant data has arrived--hahaha"))
        );
    }

    getAllModulesInGroup(moduleGroupId: number): Observable<IModuleDetail[]> {
        //let arcm_module_id:number = 3;
        //this.loadingSubject.next(true);
        return this._httpClient.get<IModuleDetail[]>(this.getRelativeUrl(`${ModuleApiName.getAllModulesInGroup}${moduleGroupId}`)).pipe(
            catchError(() => of(null)),
            finalize(() => console.log("variant data has arrived"))
        );
    }

    private getRelativeUrl(relativeUrl: ModuleApiName | string): string {
        let featureUrl = apiModuleUrl;
        let url = environment.apiBaseUrl + featureUrl + relativeUrl.toString();
        console.log(`url is ${url}`);
        return url;
    }

    saveModule(module: ISaveModule): Observable<IModuleDetail> {
       // let arcm_module_id: number = 206;

        let inputData: ISaveModule = module;
        //this.loadingSubject.next(true);
        return this._httpClient.post<IModuleDetail>(this.getRelativeUrl(ModuleApiName.saveModule), inputData, httpOptions).pipe(
            catchError(() => of(null)),
            finalize(() => console.log("variant data has arrived"))
        );
    }


    addNewModuleVariant(newModuleVariant: IModuleDetail): Observable<IModuleDetail> {
        let inputData: IModuleDetail = newModuleVariant;
        //this.loadingSubject.next(true);
        return this._httpClient.post<IModuleDetail>(this.getRelativeUrl(ModuleApiName.addNewModuleVariant), inputData, httpOptions).pipe(
            catchError(() => of(null)),
            finalize(() => console.log("New variant has been added successfully !!"))
        );

    }

    isModuleConfigurationUnique(newModuleVariant: IModuleDetail): boolean {
        let isUnique: boolean = false;
        let modulelist: IModuleDetail[] = this.allModulesForGroup;

        let variantObjTemplate = {
            "customer_code": '', "ARCM_HW_Type_ID": -1, "ARCM_Process_Type_ID": -1,
            "ARCM_Device_ID": -1, "Adv_Tech_Node": '', "Adv_Tech_Node_Value": -1
        };

        let inputObj = variantObjTemplate = newModuleVariant;

        let existingObjList = [];
        for (let i = 0; i < modulelist.length; i++) {
            variantObjTemplate = modulelist[i];
            existingObjList.push(Object.assign({}, variantObjTemplate));
        }
        return this.isUnique(inputObj, existingObjList);
    }

    isUnique(inputObj, ExistingObjList) {
        let isMatching: boolean = false;
        for (let i = 0; i < ExistingObjList.length; i++) {
            if (_.isEqual(inputObj, ExistingObjList[i])) {
                isMatching = true;
                break;
            }
        }

        return !isMatching;
    }

    setAllModuleForGroup(moduleList: IModuleDetail[]): void {
        this.allModulesForGroup = moduleList;
    }

    getAllModuleForGroup(): IModuleDetail[] {
        //this.moduleListSourceObservable.subscribe(moduleList => this.moduleDetailList = moduleList);
        return this.allModulesForGroup;
    }

    setInitialModuleListValue(moduleList: IModuleDetail[]): void {
        this.allModulesForGroup = moduleList;
        // this.moduleListSource.next(this.allModulesForGroup);
    }

    updateModuleListValue(newmodule: IModuleDetail): void {
        let modules: IModuleDetail[] = [];
        let existingList = Object.assign([], this.getAllModuleForGroup());

        let obj = existingList.find(x => x.ARCM_Module_ID === newmodule.ARCM_Module_ID);

        if (obj !== undefined) {
            let index = existingList.indexOf(obj);
            existingList[index] = newmodule;
        }
        else {
            existingList.push(newmodule);
        }

        this.allModulesForGroup = existingList;
        // this.moduleListSource.next(existingList);
    }

    saveComment(commentText: string) {

        return this._httpClient.post<boolean>(this.getRelativeUrl(ModuleApiName.saveComment), commentText, httpOptions).pipe(
            catchError(() => of(null)),
            finalize(() => console.log("comment saved"))
        );
    }

    //TODO: combine below two functions to make one function for both validated and released flag
    saveCostModalValidatedStatus(status: boolean) {

        return this._httpClient.post<boolean>(this.getRelativeUrl(ModuleApiName.saveCostModelValidatedStatus), status, httpOptions).pipe(
            catchError(() => of(null)),
            finalize(() => console.log("Validatation Status saved"))
        );
    }

    saveCostModalReleasedStatus(status: boolean) {

        return this._httpClient.post<IModuleDetail>(this.getRelativeUrl(ModuleApiName.saveCostModelReleasedStatus), status, httpOptions).pipe(
            catchError(() => of(null)),
            finalize(() => console.log("Released Status saved"))
        );
    }

    //TODO: combine above two functions to make one function for both validated and released flag

   getModuleUniqueName(prefix:string):string{
       return prefix + this.getRandomNumber();
   }

    getRandomNumber(): number {
        let randomNumber: number = 0;
        return Math.floor(Math.random() * (100 - 1 + 1)) + 1;
        //return Math.floor(Math.random() * (max - min + 1)) + min;
      }
}