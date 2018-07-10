import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'edit-module',
  templateUrl: './edit-module.component.html',
  styleUrls: ['./edit-module.component.css']
})
export class EditModuleComponent implements OnInit {

  lUsers: any[] = [
    { id: 1, Name: 'Billy Williams', Gender: 'male' },
    { id: 2, Name: 'Sally Ride', Gender: 'female'}
];
  constructor() { }

  ngOnInit() {
  }

  setNewUser(id: any): void {
    console.log(id);
    // Match the selected ID with the ID's in array
    let curUser = this.lUsers.filter(value => value.id === parseInt(id));
    console.log(curUser);
}

}
