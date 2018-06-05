import { Component, OnInit, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'arcm-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit {

  @Input() inputModalPopupSizeClass?:string = '';
  @Input() modalPopupSizeClass?:string = '';
  @Input() showFooter?:boolean = true;
  visible = false;
  visibleAnimate = false;
  
  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(change:SimpleChanges):void{
    this.modalPopupSizeClass =  this.inputModalPopupSizeClass;

  }

  public show(e:any): void {
    if(e !== undefined){
      e.preventDefault();
    }
    
    this.visible = true;
    let isClassExist = document.body.classList.contains('modal-open');
    if (!isClassExist)
     document.body.className += ' modal-open';
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(e:any): void {
    if(e !== undefined){
      e.preventDefault();
    }
    this.visibleAnimate = false;
    document.body.className = document.body.className.replace('modal-open', '');
    setTimeout(() => this.visible = false, 300);
  }
}
