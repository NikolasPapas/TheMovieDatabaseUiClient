import { Component } from '@angular/core';
import { BaseComponent } from '../Base/base.component';
import { CoreService } from '../Services/core-service';
import { UserSelectionService } from '../Services/user-selection-service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent extends BaseComponent{

  selectedFilleter: string | null=null;
  filterOptions:string[]=[];
  service: CoreService;
  userSelectionService: UserSelectionService;
	constructor(service: CoreService, userSelectionService: UserSelectionService) {
		super();
		this.service = service;
		this.userSelectionService=userSelectionService;
	}



}
