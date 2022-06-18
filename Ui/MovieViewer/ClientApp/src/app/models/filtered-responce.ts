import { MovieViewItem } from "./movie-view";

export interface FilteredResponce {
	selectedFilter:string;
	list:MovieViewItem[];
}