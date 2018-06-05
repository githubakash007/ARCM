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
import { ModuleService } from './services/module.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import { DropdownComponent } from './module-selection/components/dropdown/dropdown.component';
import { ModalDialogComponent } from './module-selection/components/modal-dialog/modal-dialog.component';
import { BsDropdownComponent } from './module-selection/components/bs-dropdown/bs-dropdown.component';
import { AddmoduleComponent } from './module-selection/components/addmodule/addmodule.component';


@NgModule({
  declarations: [
    AppComponent,
    ModuleSelectionComponent,
    DropdownComponent,
    ModalDialogComponent,
    BsDropdownComponent,
    AddmoduleComponent
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
    RouterModule.forRoot(AppRoutes)
   ],
  providers: [ModuleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
