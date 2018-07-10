import { Injectable } from "@angular/core";
import { IModule } from "../../module-selection/modal/IModule";

@Injectable()
export class AppStateService {
    SelectedBaseModule: IModule;
    setSelectedBaseModule(baseModule: IModule): void {
        this.SelectedBaseModule = baseModule;
    }

    getSelectedBaseModule(): IModule {
        return this.SelectedBaseModule;
    }

}