import { FormBuilder, FormGroup } from "@angular/forms";
import { MovieListItem } from "src/app/models/movie-list-item";



export class ListingItemEditorModel {
	id: string="";
	originalTitle: string="";

	public fromModel(item: MovieListItem): ListingItemEditorModel {
		if (item) {
			this.id = item.id;
			this.originalTitle = item.originalTitle;
		}
		return this;
	}

	buildForm(): FormGroup {
		return new FormBuilder().group({
			id: [{ value: this.id, disabled: true }],
			originalTitle: [{ value: this.originalTitle, disabled: true }]
		});
	}
}