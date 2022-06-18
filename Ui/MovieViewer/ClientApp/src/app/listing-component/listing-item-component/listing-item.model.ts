import { FormBuilder, FormGroup } from "@angular/forms";
import { MovieListItem } from "src/app/models/movie-list-item";



export class ListingItemModel {
	id: string="";
	title: string="";

	public fromModel(item: MovieListItem|null): ListingItemModel {
		if (item) {
			this.id = item.id;
			this.title = item.title;
		}
		return this;
	}

	buildForm(): FormGroup {
		return new FormBuilder().group({
			id: [{ value: this.id, disabled: true }],
			title: [{ value: this.title, disabled: true }]
		});
	}
}