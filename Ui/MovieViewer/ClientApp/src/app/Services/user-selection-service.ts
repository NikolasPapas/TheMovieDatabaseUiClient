import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class UserSelectionService {

	private selectedIdSubject = new Subject<string|null>();
	private selectedFilterSubject = new Subject<string|null>();


	constructor() {
	}

	changeSelectedItem(newId?: string|null) {
		if(newId!=null)
		this.selectedIdSubject.next(newId);
		else
		this.selectedIdSubject.next(null);
	}

	onChangeSelectionId(): Observable<string|null> {
		return this.selectedIdSubject.asObservable();
	}

	changeSelectedFilter(newFilter?: string|null) {
		if(newFilter!=null)
		this.selectedFilterSubject.next(newFilter);
		else
		this.selectedFilterSubject.next(null);

		this.selectedIdSubject.next(null);
	}

	onChangeSelectionFilter(): Observable<string|null> {
		return this.selectedFilterSubject.asObservable();
	}

}