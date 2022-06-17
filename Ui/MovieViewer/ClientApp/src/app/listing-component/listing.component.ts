import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { BaseComponent } from "../Base/base.component";


@Component({
	selector: 'app-listing',
	templateUrl: 'listing.component.html'
})
export class ListingComponent extends BaseComponent implements OnInit, OnChanges {

	constructor() {
		super();
	}

	ngOnInit() {

	}

	ngOnChanges(changes: SimpleChanges): void {

	}

}