import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { BaseComponent } from "../Base/base.component";




@Component({
	selector: 'app-view',
	templateUrl: 'view.component.html'
})
export class ViewComponent extends BaseComponent implements OnInit, OnChanges {

	constructor() {
		super();
	}

	ngOnInit() {

	}

	ngOnChanges(changes: SimpleChanges): void {

	}

}