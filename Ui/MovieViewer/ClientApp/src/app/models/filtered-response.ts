import { MovieViewItem } from "./movie-view";

export interface FilteredResponse {
	selectedFilter:string;
	list:MovieViewItem[];
	selectedPage:number;
	pageCount:number;
}