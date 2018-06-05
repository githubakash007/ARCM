import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'arcm-bs-dropdown',
  templateUrl: './bs-dropdown.component.html',
  styleUrls: ['./bs-dropdown.component.css']
})
export class BsDropdownComponent implements OnInit {

  constructor() { }
  segmentFilterValues: string[] = [];
  pbgFilterValues: string[] = [];
  waferSizeFilterValues: string[] = [];

  @Input() segmentOptions: string[] = [];
  @Input() pbgOptions: string[] = [];
  @Input() waferSizeOptions: string[] = [];
  ngOnInit() {
  }

  filterData(selectedValue: any): void {
    //console.log(selectedValue);

  }

}
