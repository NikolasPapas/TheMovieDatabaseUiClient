import { Component, OnInit } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";
import { PageEvent } from "@angular/material/paginator";
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from "../Base/base.component";
import { FilteredResponse } from "../models/filtered-response";
import { FrillerRequest } from "../models/friller-request";
import { CoreService } from "../Services/core-service";
import { UserSelectionService } from "../Services/user-selection-service";
import { ListingModel } from "./listing.model";


@Component({
	selector: 'app-listing',
	templateUrl: 'listing.component.html'
})
export class ListingComponent extends BaseComponent implements OnInit {

	movieListForm: FormGroup = new ListingModel().fromModel(null).buildForm();
	movieListTitle: string = "Most Popular Movies";
	movieListArray: FormArray | undefined;
	expandedIndex: number = -1;
	lastOpened: number | undefined;


	pageEvent: PageEvent | undefined;
	pageSize: number = 1;
	currentPage: number = 1;
	TotalPages: number = 1;

	private service: CoreService;
	private userSelectionService: UserSelectionService;

	constructor(service: CoreService, userSelectionService: UserSelectionService) {
		super();
		this.service = service;
		this.userSelectionService = userSelectionService;
	}

	ngOnInit() {
		this.initChangFilterSubscription();
		this.userSelectionService.changeSelectedFilter(this.movieListTitle);
	}

	initChangFilterSubscription() {
		this.userSelectionService.onChangeSelectionFilter().pipe(takeUntil(this._destroyed))
			.subscribe(filter => {
				if (filter != null) this.calFilter(filter);
			});
	}

	calFilter(filter: FrillerRequest) {
		this.close(-1);
		setTimeout(() => {
			this.service.GetMovieFilteredList(filter).pipe(takeUntil(this._destroyed))
			.subscribe(
				(successResponse: FilteredResponse) => {
					this.movieListForm = new ListingModel().fromModel(successResponse.list).buildForm();
					this.movieListTitle = successResponse.selectedFilter;
					this.movieListArray = (this.movieListForm.get('items') as FormArray);
					this.currentPage = successResponse.selectedPage;
					this.TotalPages = successResponse.pageCount;
					this.pageSize = this.movieListArray?.controls.length;
				},
				error => console.error(error));
		});
	}

	open(index: number) {
		setTimeout(() => {
			this.collapseAll();
		});
		setTimeout(() => {
			this.expandedIndex = index;
			this.userSelectionService.changeSelectedItem(this.GetItem(index)?.get('id')?.value)
		});
	}

	close(index: number) {
		this.collapseAll();
		this.userSelectionService.changeSelectedItem(null)
	}

	GetItem(index: number): FormGroup {
		return (this.movieListArray?.controls[index] as FormGroup);
	}

	collapseAll() {
		this.expandedIndex = -1;
	}

	handlePageEvent(event: PageEvent) {
		this.userSelectionService.changeSelectedFilterPage(event.pageIndex + 1)
	}

	movieListTrackByFn(index: number, item: FormGroup) {
		return Number(item.get('id')?.value);
	}
}