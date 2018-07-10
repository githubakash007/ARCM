import { Component, OnInit, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { TabsComponent } from '../shared/component/tabs/tabs.component';
import { ModuleService } from '../services/module.service';
import { IModuleDetail } from '../modal/IModuleDetail';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AppStateService } from '../shared/service/appstate.service';
import { IModule } from '../module-selection/modal/IModule';

@Component({
  selector: 'create-module',
  templateUrl: './createmodule.component.html',
  styleUrls: ['./createmodule.component.css']
})
export class CreateModuleComponent implements OnInit {


  @ViewChild(TabsComponent) tabsComponent;
  @ViewChild('addNewVariant') addVariantTemplate;

  moduleDetailList: IModuleDetail[] = [];
  selectedBaseModule: IModule;
  // @ViewChild(BaconDirective)
  // set appBacon(directive: BaconDirective) {
  //   this.extraIngredient = directive.ingredient;
  // };
  isCopyFromDialogOpened: boolean = false;
  constructor(private _moduleService: ModuleService, private activatedRoute: ActivatedRoute, private cd: ChangeDetectorRef,
    private _router: Router, private _appState: AppStateService) {

    this._moduleService.setInitialModuleListValue(this._moduleService.getAllModuleForGroup());
    console.log("resolver data arrived");

    // this.moduleDetailList = this.activatedRoute.snapshot.data['existingModules'];
    console.log(this.moduleDetailList);
    //  this.activatedRoute.data.pipe(
    //    map(data => data.existingModules()).subscribe()
    //   );
  }

  

  ngOnInit() {
    // this._moduleService.getModuleDetail(118).subscribe(
    //   result => {
    //     console.log("ModuleDetails arrived");
    //     console.log(result);
    //     this.moduleDetailList = result;
    //   }
    // )
    //this._moduleService.moduleListSourceObservable.subscribe(moduleList => this.moduleDetailList = moduleList);
    this.moduleDetailList = this._moduleService.getAllModuleForGroup();
    this.selectedBaseModule = this._appState.getSelectedBaseModule();

  }

  addNewCostModel(e: any): void {
   // this.isCopyFromDialogOpened = true;
    let costModelName =  this._moduleService.getModuleUniqueName("Base-");
    let obj = {"ARCM_Module_Group_ID":this.selectedBaseModule.ARCMModuleGroupId,"Module_Name":this.selectedBaseModule.ModuleName,"Cost_Model_Name":costModelName,"ARCM_Module_ID":null}
    this.tabsComponent.openNewTab(costModelName,this.addVariantTemplate, <IModuleDetail>obj, true);
  }

  copyVariant(e: any): void {

  }

  createNewModuleFromExistingModule(moduleDetail: IModuleDetail): void {
    //set the ARCM_MOdule_Id as null coz this is a new module copied from an existing one
    moduleDetail.Copied_From_Module_ID = moduleDetail.ARCM_Module_ID;
    moduleDetail.ARCM_Module_ID = null;
    let costModelName =  this._moduleService.getModuleUniqueName("child-");
    moduleDetail.Cost_Model_Name = costModelName;
    this.tabsComponent.openNewTab(costModelName, this.addVariantTemplate, moduleDetail, true);

  }

  copyFromExistingModule(): void {

    let selectedTab = this.tabsComponent.getActiveTab();
    console.log(`selected tab name ${selectedTab.tabTitle}`);


  }
  onCancel(e: any): void {
    this.isCopyFromDialogOpened = false;
  }

  onProceed(): void {
    this.isCopyFromDialogOpened = false;
  }

  //TODO: Need to remove the below code. No Need to trigger change detection again
  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  goToModuleSelection(e: any): void {
    e.preventDefault();
    this._router.navigate(['./moduleselection']);
  }

  onSuccessfulModuleSave(moduleDetail: IModuleDetail): void {
    let t = this.tabsComponent.getActiveTab();
    //  this.tabsComponent.closeTab(t);
    this.tabsComponent.makeDynamicStatic(t);

  }

  backUpCurrentCostModel(e:any):void{
     e.preventDefault();
     alert("This functionlity will be implemented later on.")
  }
}
