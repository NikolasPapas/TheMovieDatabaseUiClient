import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BaseComponent } from "src/app/Base/base.component";

@Component({
	selector: 'app-listing-item',
	templateUrl: 'listing-item.component.html',
    styleUrls: ['listing-item.component.scss'],
})
export class ListingItemComponent extends BaseComponent implements OnInit, OnChanges {

	@Input() formItem: FormGroup= new FormBuilder().group({});
    @Input() index: number | undefined;
    @Input() isOpened: boolean=false;
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