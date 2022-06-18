import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { BaseComponent } from "../Base/base.component";
import { CoreService } from "../Services/core-service";
import { takeUntil } from 'rxjs/operators';
import { MovieListItem } from "../models/movie-list-item";


@Component({
	selector: 'app-listing',
	templateUrl: 'listing.component.html'
})
export class ListingComponent extends BaseComponent implements OnInit, OnChanges {

	public movieList: MovieListItem[]=[];

	private service: CoreService;
	constructor(service: CoreService) {
		super();
		this.service = service;
	}

	ngOnInit() {
		this.service.GetMovieList().pipe(takeUntil(this._destroyed))
			.subscribe(
				(successResponse: MovieListItem[]) => this.movieList = successResponse,
				error => console.error(error));
	}

	ngOnChanges(changes: SimpleChanges): void {

	}

}