import { Component, OnInit,OnDestroy, Input } from '@angular/core';
import { SpinnerService } from '../../service/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit,OnDestroy {

  @Input() name:string;
  @Input() show:boolean = false;
  constructor(private spinnerService:SpinnerService) { }
    
  ngOnInit() {
    
    if(!name){
      throw new Error("Spinner must have a 'name' attribute.");
    }
      this.spinnerService.register(this);
  }

  ngOnDestroy():void{
    this.spinnerService.unregister(this);
  }



}
