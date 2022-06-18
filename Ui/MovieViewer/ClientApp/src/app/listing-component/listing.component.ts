import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { BaseComponent } from "../Base/base.component";
import { CoreService } from "../Services/core-service";
import { takeUntil } from 'rxjs/operators';
import { MovieListItem } from "../models/movie-list-item";
import { FormGroup, FormArray } from "@angular/forms";
import { ListingModel } from "./listing.model";
import { UserSelectionService } from "../Services/user-selection-service";
import { FilteredResponce } from "../models/filtered-responce";
import { FrillerRequest } from "../models/friller-request";


@Component({
	selector: 'app-listing',
	templateUrl: 'listing.component.html'
})
export class ListingComponent extends BaseComponent implements OnInit, OnChanges {

	movieListForm: FormGroup = new ListingModel().fromModel(null).buildForm();
	movieListTitle: string = "Most Popular Movies";
	movieListArray: FormArray | undefined;
	expandedIndex: number = -1;
	lastOpened: number | undefined;

	private service: CoreService;
	private userSelectionService: UserSelectionService;

	constructor(service: CoreService, userSelectionService: UserSelectionService) {
		super();
		this.service = service;
		this.userSelectionService = userSelectionService;
	}

	ngOnInit() {
		this.service.GetMovieList().pipe(takeUntil(this._destroyed))
			.subscribe(
				(successResponse: MovieListItem[]) => {
					this.movieListForm = new ListingModel().fromModel(successResponse).buildForm();

					this.movieListArray = (this.movieListForm.get('items') as FormArray);
				},
				error => console.error(error));
		this.initChangFilterSubscription();
	}

	ngOnChanges(changes: SimpleChanges): void {
	}

	initChangFilterSubscription() {
		this.userSelectionService.onChangeSelectionFilter().pipe(takeUntil(this._destroyed))
			.subscribe(filterValue => {
				const req: FrillerRequest = {
					filter: filterValue
				};
				this.service.GetMovieFilteredList(req).pipe(takeUntil(this._destroyed))
					.subscribe(
						(successResponse: FilteredResponce) => {
							this.movieListForm = new ListingModel().fromModel(successResponse.list).buildForm();
							this.movieListTitle = successResponse.selectedFilter;
							this.movieListArray = (this.movieListForm.get('items') as FormArray);
						},
						error => console.error(error));
			});
	}


	open(index: number) {
		this.collapseAll();
		this.expandedIndex = index;
		this.userSelectionService.changeSelectedItem(this.GetItem(index)?.get('id')?.value)
	}

	close(index: number) {
		if (this.expandedIndex === index) this.lastOpened = index;
		this.collapseAll();
		this.userSelectionService.changeSelectedItem(null)
	}

	GetItem(index: number): FormGroup {
		return (this.movieListArray?.controls[index] as FormGroup);
	}

	collapseAll() {
		this.expandedIndex = -1;
	}

	movieListTrackByFn(index: number, item: FormGroup) {
		return Number(item.get('id')?.value);
	}
}