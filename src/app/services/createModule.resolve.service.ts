import { Injectable } from "@angular/core";
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { ModuleService } from "./module.service";
import { IModuleDetail } from "../modal/IModuleDetail";
import { map, catchError, finalize } from "rxjs/operators";
import { of } from "rxjs/observable/of";

@Injectable()
export class CreateModuleResolver implements Resolve<boolean>{

    constructor(private _moduleService: ModuleService){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
        let moduleGroupId = route.params['groupModuleId'];
       // let moduleGroupId = 118;  
       return this._moduleService.getAllModulesInGroup(moduleGroupId).pipe(
        map(data => this._moduleService.setAllModuleForGroup(<IModuleDetail[]>data))
       ,map(() => true)
       ,catchError(error =>  {
          return of(false);
       }),
       finalize(() => console.log("loading of variant module is done in the resolver"))
    )
        // return this._moduleService.getAllModulesInGroup(moduleGroupId);

    }

}