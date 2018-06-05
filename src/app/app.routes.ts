import { Routes } from '@angular/router';
import { ModuleSelectionComponent } from "./module-selection/module-selection.component";

export const AppRoutes: Routes = [
    
    {
        path: '',
        redirectTo: 'moduleselection',
        pathMatch: 'full'
    },
    {
        path: "moduleselection",
        component: ModuleSelectionComponent
    }
        
    ]; 