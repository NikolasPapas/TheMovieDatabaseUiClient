import { MovieListItem } from "./movie-list-item";


export interface MovieViewItem extends MovieListItem {
	adult: boolean;
	originalTitle:string;
	originalLanguage: string;
	overview:string;
	releaseDate:Date;
	backdropPath:string;
	voteAverage:number;
	voteCount:number;
}