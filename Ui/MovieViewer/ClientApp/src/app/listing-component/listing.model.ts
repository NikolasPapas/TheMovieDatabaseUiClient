import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { MovieListItem } from "../models/movie-list-item";
import { ListingItemModel } from "./listing-item-component/listing-item.model";



export class ListingModel {

	moviesItems: ListingItemModel[] | undefined;

	public fromModel(item:MovieListItem[]|null): ListingModel {
		if (item) {
			this.moviesItems = item.map((x)=>new ListingItemModel().fromModel(x));
		}
		return this;
	}

	buildForm(): FormGroup {
		let formGroup =  new FormBuilder().group({});
		let formArray: FormArray = new FormArray([]);
        if (this.moviesItems != null && this.moviesItems.length != 0)
            this.moviesItems.forEach(item => {
                formArray.push(item.buildForm());
            })
		formGroup.addControl('items',formArray);
		return formGroup;
	}
}