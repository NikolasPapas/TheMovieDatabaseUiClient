import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { BaseComponent } from '../Base/base.component';
import { CoreService } from '../Services/core-service';
import { UserSelectionService } from '../Services/user-selection-service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent extends BaseComponent {

  selectedFilleter: string|null;
  filterOptions: string[] = [
    "",
    "Most Popular Movies",
    "Least Popular Movies",
    "Most Reted Movies",
    "Least Reted Movies",
    "Most Payed Movies",
    "Least Peyed Movies",
    "Most Voted Movies",
    "Least Voted Movies",
    "Most Recent Movies",
    "Least Resent Movies",
    "By Title (A->Z)",
    "By Title (Z->A)"
  ];
  service: CoreService;
  userSelectionService: UserSelectionService;

  constructor(service: CoreService, userSelectionService: UserSelectionService) {
    super();
    this.service = service;
    this.userSelectionService = userSelectionService;
    this.selectedFilleter = "";
  }

  resetSelection(x:any) {
    if(this.selectedFilleter=="")
      this.userSelectionService.changeSelectedFilter(null);
    else
      this.userSelectionService.changeSelectedFilter(this.selectedFilleter);
  }

}
