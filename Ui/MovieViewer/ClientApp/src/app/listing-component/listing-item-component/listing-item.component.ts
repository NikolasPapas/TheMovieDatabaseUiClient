import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BaseComponent } from "src/app/Base/base.component";
import { ListingItemModel } from './listing-item.model';


@Component({
	selector: 'app-listing-item',
	templateUrl: 'listing-item.component.html'
})
export class ListingItemComponent extends BaseComponent implements OnInit, OnChanges {

	@Input() formItem: FormGroup= new FormBuilder().group({});
    @Input() index: number | undefined;
    @Input() expandedIndex: number | undefined;
    @Input() lastOpened: boolean | undefined;
    @Output() onOpen = new EventEmitter<number>();
    @Output() onClose = new EventEmitter<number>();

    isOpen: boolean = false;

	constructor() {
		super();
	}

	ngOnInit(): void {
	}

	ngOnChanges(changes: SimpleChanges): void {
	}


    open() {
        this.isOpen = true;
        this.onOpen.emit(this.index);
    }

    close() {
        this.isOpen = false;
        this.onClose.emit(this.index);
    }
}