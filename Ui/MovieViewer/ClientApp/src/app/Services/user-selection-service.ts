import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class UserSelectionService {

	private selectedIdSubject = new Subject<string|null>();

	
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


}