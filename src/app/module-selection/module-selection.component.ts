import { Component, OnInit, ViewChild, ElementRef, AfterViewInit,OnDestroy } from '@angular/core';
import { IModule } from './modal/IModule';
import { Observable } from 'rxjs/Observable';
import { IModuleSelection } from './modal/IModuleSelection';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime, distinctUntilChanged, startWith, tap, delay, catchError, finalize } from 'rxjs/operators';
import { FilterName } from './enum/filterName.enum';
import { IKeyValue } from './modal/IKeyValue';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ModuleSelectionService } from '../services/moduleSelection.service';
import { Router } from '@angular/router';
import { AppStateService } from '../shared/service/appstate.service';


@Component({
  selector: 'module-selection',
  templateUrl: './module-selection.component.html',
  styleUrls: ['./module-selection.component.css']
})
export class ModuleSelectionComponent implements OnInit, AfterViewInit,OnDestroy {

  cols: any[];
  data: Observable<IModuleSelection>;
  moduleList: IModule[];
  moduleCount: number = 0;
  segmentFilterValues: string[] = [];
  pbgFilterValues: string[] = [];
  waferSizeFilterValues: string[] = [];
  FilterName: any = Object.assign({}, FilterName);
  isLoading: boolean = false;

  segmentFilterSelectedValues: string;
  waferSizeFilterSelectedValues: string;
  pbgFilterSelectedValues: string;
  releasedFilterSelectedValues: boolean;
  validatedFilterSelectedValues: boolean;
  moduleName: string;
  keyValueObj: IKeyValue = { columnName: '', columnValue: '' };
  filterInputList: IKeyValue[] = [];

  private clearDropdownSubject = new BehaviorSubject<number>(0);
  public clearDropdownObservable = this.clearDropdownSubject.asObservable();

  //BehaviorSubject


  @ViewChild('addModuleDialog') addModuleDialog;
  @ViewChild('globalModuleSearchInput') globalModuleSearchInput: ElementRef;
  isVisible: boolean = false;
  constructor(private _moduleService: ModuleSelectionService,private _router:Router,private _appState:AppStateService) { }

  ngOnInit() {
    this._moduleService.loadingObservable.subscribe(val => this.isLoading = val);
    this._moduleService.getModules(this.filterInputList);
    this._moduleService.moduleObservable.subscribe(modules => {
      if (modules && modules.length > 0) {
        this.moduleCount = modules[0].TotalBaseModuleCount;
       // console.log(`modal count is ${this.moduleCount}`);
      }
      else {
        this.moduleCount = 0;
      }
      this.moduleList = modules;
    });

    this._moduleService.getModuleFilters().subscribe(filters => {
      if (filters && filters.length > 0) {
        this.segmentFilterValues = [...Array.from(new Set(filters.map(item => item.Segment).filter(x => x !== null)))];
        this.pbgFilterValues = [...Array.from(new Set(filters.map(item => item.PBG).filter(x => x != null)))];
        this.waferSizeFilterValues = [...Array.from(new Set(filters.map(item => item.WaferSize).filter(x => x !== null)))];

      }
    });



    this.cols = [
      { field: 'ARCMModuleGroupId', header: 'ModuleId' },
      { field: 'ModuleName', header: 'ModuleName' },
      { field: 'ModuleType', header: 'Module Type' },
      { field: 'WaferSize', header: 'WaferSize' },
      { field: 'PBG', header: 'PBG' },
      // { field: 'Division', header: 'Division' },
      // { field: 'KPU', header: 'KPU' },
      // { field: 'Application', header: 'Application' },
      { field: 'Plateform', header: 'Plateform' },
      { field: 'Segment', header: 'Segment' },
      // { field: 'ModuleReleased', header: 'ModuleReleased' },
      // { field: 'TemplateModuleValidated', header: 'TemplateModuleValidated' }

    ];
  }

  loadModules(filterKey = '', sortOrder = 'asc', pageNumber = 0, pageSize = 10): void {
    this._moduleService.moduleObservable.subscribe(data => this.moduleList = data);
  }

  paginate(event: any) {
    this._moduleService.getModules(this.filterInputList,this.globalModuleSearchInput.nativeElement.value, 'asc', event.page, event.rows);
  }

  ngAfterViewInit() {

    fromEvent(this.globalModuleSearchInput.nativeElement, 'keyup')
      .pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap(() => {
        //this.paginator.pageIndex = 0;

        this._moduleService.getModules(this.filterInputList, this.globalModuleSearchInput.nativeElement.value, 'asc', 0, 10);
      })
      )
      .subscribe();
  }

  private updateSelectedFilterList(selectedValue: any, filterType: string) {
    if (this.filterInputList.findIndex(x => x.columnName == filterType) > -1) {
      this.filterInputList.find(x => x.columnName == filterType).columnValue = selectedValue;

    }
    else {
      this.keyValueObj = { columnName: filterType, columnValue: selectedValue };
      this.filterInputList.push(this.keyValueObj);
    }
    // console.log("filterInputList ");
    // console.log(this.filterInputList);
  }

  selectedValueChanged(selectedValue: any, filterType: any): void {
    if (filterType == FilterName.Segment) {
      this.updateSelectedFilterList(selectedValue, filterType);
      this.segmentFilterSelectedValues = selectedValue;
    }
    else if (filterType == FilterName.PBG) {
      this.updateSelectedFilterList(selectedValue, filterType);
      this.pbgFilterSelectedValues = selectedValue;
    }
    else if (filterType == FilterName.WaferSize) {
      this.updateSelectedFilterList(selectedValue, filterType);
      this.waferSizeFilterSelectedValues = selectedValue;
    }
    else if (filterType == FilterName.TemplateModuleValidated) {
      this.updateSelectedFilterList(selectedValue, filterType);
      this.validatedFilterSelectedValues = selectedValue;
    }
    else if (filterType == FilterName.ModuleReleased) {
      this.updateSelectedFilterList(selectedValue, filterType);
      this.releasedFilterSelectedValues = selectedValue;
    }

  }

  filterModuleList(e:any): void {
    this._moduleService.getModules(this.filterInputList, this.globalModuleSearchInput.nativeElement.value);
  }

  showDialog(e: any): void {
    e.preventDefault();
    this.addModuleDialog.show();
  }
  hideDialog(e: any): void {
    e.preventDefault();
    this.addModuleDialog.hide(e);
  }

  hideModalDialog(hide: boolean): void {
    if (hide) {
      this.addModuleDialog.hide();
    }
  }

  reload(loadGrid: boolean): void {
    if (loadGrid) {
      this.globalModuleSearchInput.nativeElement.value = '';
      this._moduleService.getModules(this.filterInputList);
    }
  }

  clearFilters(e: any): void {

    let num: number = this.getRandomNumber();
    if (num > 0 && num != this.clearDropdownSubject.getValue()) {
      this.clearDropdownSubject.next(num);
      this.filterInputList = [];
    }
    else {
      this.clearFilters(0);
    }
  }


  getRandomNumber(): number {
    let randomNumber: number = 0;
    return Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    //return Math.floor(Math.random() * (max - min + 1)) + min;
  }


   goToCreateModulePage(e:any,groupId:number):void{
     e.preventDefault();
      console.log(groupId);
      this._appState.setSelectedBaseModule(this.moduleList.find(x => x.ARCMModuleGroupId === groupId));

      this._router.navigate(['./createModule', groupId]);
   }

   ngOnDestroy():void{
    // this._moduleService.setSelectedBaseModule(this.moduleList.find(x => x.ARCMModuleGroupId === groupId));
   }

  

  

}
