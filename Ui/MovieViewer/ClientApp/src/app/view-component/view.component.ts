import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { BaseComponent } from "../Base/base.component";
import { UserSelectionService } from "../Services/user-selection-service";
import { CoreService } from '../Services/core-service';
import { ListingViewEditorModel } from './view.model';




@Component({
	selector: 'app-view',
	templateUrl: 'view.component.html'
})
export class ViewComponent extends BaseComponent implements OnInit, OnChanges {
	url: string = "";
	haveSelectedItem: boolean = false;
	userSelectionService: UserSelectionService;
	coreService: CoreService;
	formView: FormGroup = new FormBuilder().group({});
	
	currentRate:number=0;
	currentVotes:number=0;

	constructor(userSelectionService: UserSelectionService, coreService: CoreService) {
		super();
		this.userSelectionService = userSelectionService;
		this.coreService = coreService
	}

	ngOnInit() {
		this.userSelectionService.onChangeSelectionId()
			.pipe(takeUntil(this._destroyed))
			.subscribe((id) => { if (id != null) this.onActionSelected(id); this.haveSelectedItem = false; });

	}

	onActionSelected(id: string) {
		this.coreService.GetMovieView(id)
			.pipe(takeUntil(this._destroyed))
			.subscribe((responce) => { this.formView = new ListingViewEditorModel().fromModel(responce).buildForm(); this.haveSelectedItem = true; this.GetImagePath(); },
				error => console.error(error));
	}

	ngOnChanges(changes: SimpleChanges): void {

	}

	GetImagePath() {
		let url = 'https://image.tmdb.org/t/p/w500/';
		url = url + this.getValue('backdropPath');
		url = url + '?api_key=9198fa6d9a9713bc6b03ee9582525917';
		this.url = url;
	}

	getValue(name: string): string {
		return (this.formView.get(name) as FormControl).value;
	}
}