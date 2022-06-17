import { Component, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";



@Component({
	selector: 'base-component',
	templateUrl: './base.component.html'
})
export abstract class BaseComponent implements OnDestroy {
	protected _destroyed: Subject<boolean> = new Subject();

	protected constructor() {}

	ngOnDestroy(): void {
		this._destroyed.next(true);
		this._destroyed.complete();
	}
}
