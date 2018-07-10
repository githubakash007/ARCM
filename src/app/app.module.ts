import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ModuleSelectionComponent } from './module-selection/module-selection.component';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routes';
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule} from './shared/shared.module';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import { DropdownComponent } from './module-selection/components/dropdown/dropdown.component';
import { ModalDialogComponent } from './module-selection/components/modal-dialog/modal-dialog.component';
import { BsDropdownComponent } from './module-selection/components/bs-dropdown/bs-dropdown.component';
import { AddmoduleComponent } from './module-selection/components/addmodule/addmodule.component';
import { CreateModuleComponent } from './createmodule/createmodule.component';
import { EditModuleComponent } from './edit-module/edit-module.component';
import { ModuleSelectionService } from './services/moduleSelection.service';
import { ModuleService } from './services/module.service';
import { PartlistComponent } from './partlist/partlist.component';
import { PmlistComponent } from './pmlist/pmlist.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { BaseModuleComponent } from './basemodule/basemodule.component';
import { TabComponent } from './shared/component/tabs/tab/tab.component';
import { TabsComponent } from './shared/component/tabs/tabs.component';
import { CreateModuleResolver } from './services/createModule.resolve.service';



@NgModule({
  declarations: [
    AppComponent,
    ModuleSelectionComponent,
    DropdownComponent,
    ModalDialogComponent,
    BsDropdownComponent,
    AddmoduleComponent,
    CreateModuleComponent,
    EditModuleComponent,
    PartlistComponent,
    PmlistComponent,
    BaseModuleComponent
    //  TabComponent,
    //  TabsComponent
    
    
  ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    TableModule,
    PaginatorModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    ProgressSpinnerModule,
    GridModule,
    DropDownsModule,
    RouterModule.forRoot(AppRoutes)
   ],
  providers: [ModuleSelectionService,ModuleService,CreateModuleResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
