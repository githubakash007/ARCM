import { Routes } from '@angular/router';
import { ModuleSelectionComponent } from "./module-selection/module-selection.component";
import { CreateModuleComponent } from './createmodule/createmodule.component';
import { BaseModuleComponent } from './basemodule/basemodule.component';
import { CreateModuleResolver } from './services/createModule.resolve.service';

export const AppRoutes: Routes = [
    
    {
        path: '',
        redirectTo: 'moduleselection',
        pathMatch: 'full'
    },
    {
        path: "moduleselection",
        component: ModuleSelectionComponent
    },
    {
        path: 'createModule/:groupModuleId',
        pathMatch: 'full',
        component:CreateModuleComponent,
        resolve:{existingModules:CreateModuleResolver}
    },
    {
        path:'baseModule',
        pathMatch:'full',
        component:BaseModuleComponent
    },
        
    ]; 