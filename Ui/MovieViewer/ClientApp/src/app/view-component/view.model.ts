import { FormBuilder, FormGroup } from "@angular/forms";
import { ListingItemEditorModel } from "../listing-component/listing-item-component/listing-item.model";
import { MovieViewItem } from "../models/movie-view";

export class ListingViewEditorModel extends ListingItemEditorModel{
	id: string="";
	originalTitle: string="";
	adult: boolean=true;
	originalLanguage: string="";
	overview:string="";
	releaseDate!: Date;
	backdropPath:string="";
	voteAverage:number=0;
	voteCount:number=0;

	public fromModel(item: MovieViewItem): ListingViewEditorModel {
		if (item) {
			this.id = item.id;
			this.originalTitle = item.originalTitle;
			this.adult = item.adult;
			this.originalLanguage = item.originalLanguage;
			this.overview = item.overview;
			this.releaseDate = item.releaseDate;
			this.backdropPath = item.backdropPath;
			this.voteAverage = item.voteAverage;
			this.voteCount = item.voteCount;
		}
		return this;
	}

	buildForm(): FormGroup {
		return new FormBuilder().group({
			id: [{ value: this.id, disabled: true }],
			originalTitle: [{ value: this.originalTitle, disabled: true }],
			adult:[{ value: this.adult, disabled: true }],
			originalLanguage:[{ value: this.originalLanguage, disabled: true }],
			overview :[{ value: this.overview, disabled: true }],
			releaseDate :[{ value: this.releaseDate, disabled: true }],
			backdropPath :[{ value: this.backdropPath, disabled: true }],
			voteAverage :[{ value: this.voteAverage, disabled: true }],
			voteCount :[{ value: this.voteCount, disabled: true }],
		});
	}
}