import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from './service/notification.service';
import { TabsComponent } from './component/tabs/tabs.component';
import { TabComponent } from './component/tabs/tab/tab.component';
import { AppStateService } from './service/appstate.service';
import { SpinnerComponent } from './spinner/component/spinner/spinner.component';
import { SpinnerService } from './spinner/service/spinner.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TabsComponent, TabComponent, SpinnerComponent],
  
  providers:[NotificationService,AppStateService,SpinnerService],
  exports: [
    TabsComponent,
    TabComponent
    
  ],
  entryComponents:[TabComponent]
})
export class SharedModule { }
