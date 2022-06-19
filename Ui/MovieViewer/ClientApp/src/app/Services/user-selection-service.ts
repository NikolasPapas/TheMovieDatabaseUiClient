import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { FrillerRequest } from "../models/friller-request";

@Injectable()
export class UserSelectionService {

	private selectedIdSubject = new Subject<string | null>();
	private selectedFilterSubject = new Subject<FrillerRequest | null>();
	currentFilter: FrillerRequest

	constructor() {
		const filter:FrillerRequest={
			filter:null,
			page:null
		};
		this.currentFilter =filter;
	}

	changeSelectedItem(newId?: string | null) {
		if (newId != null)
			this.selectedIdSubject.next(newId);
		else
			this.selectedIdSubject.next(null);
	}

	onChangeSelectionId(): Observable<string | null> {
		return this.selectedIdSubject.asObservable();
	}

	changeSelectedFilter(newFilter?: string | null) {
		if (newFilter != null){
			this.currentFilter.filter = newFilter;
		}
		else
			this.currentFilter.filter = null;
		this.selectedFilterSubject.next(this.currentFilter);
		this.selectedIdSubject.next(null);
	}

	changeSelectedFilterPage(selectedPage?: number | null) {
		if (selectedPage != null)
			this.currentFilter.page = selectedPage;
		else
			this.currentFilter.page = null;
		this.selectedFilterSubject.next(this.currentFilter);
		this.selectedIdSubject.next(null);
	}

	onChangeSelectionFilter(): Observable<FrillerRequest | null> {
		return this.selectedFilterSubject.asObservable();
	}

}