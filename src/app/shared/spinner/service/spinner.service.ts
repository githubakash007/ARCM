import { Injectable } from "@angular/core";
import { SpinnerComponent } from "../component/spinner/spinner.component";

@Injectable()
export class SpinnerService {

    spinnerCollection = new Set<SpinnerComponent>();
    constructor() { }

    register(spinner: SpinnerComponent): void {
        this.spinnerCollection.add(spinner);
    }

    unregister(spinnerToRemove: SpinnerComponent): void {
        this.spinnerCollection.forEach(spinner => {
            if (spinner === spinnerToRemove) {
                this.spinnerCollection.delete(spinnerToRemove);

            }
        });
    }

    show():void{
        
    }

}