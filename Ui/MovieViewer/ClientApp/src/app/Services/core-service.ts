import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FilteredResponce } from "../models/filtered-responce";
import { FrillerRequest } from "../models/friller-request";
import { MovieListItem } from "../models/movie-list-item";
import { MovieViewItem } from "../models/movie-view";

@Injectable()
export class CoreService {
	httpClient: HttpClient;
	baseUrl: string;
	constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
		this.httpClient = http;
		this.baseUrl = baseUrl;
	}

	GetMovieList(): Observable<MovieListItem[]> {
		return this.httpClient.get<MovieListItem[]>(this.baseUrl + 'movies/getPopularMovies');
	}

	GetMovieView(id: string): Observable<MovieViewItem> {
		return this.httpClient.get<MovieViewItem>(this.baseUrl + 'movies/getMovieById' + '?id=' + id);
	}

	GetMovieFilteredList(reques:FrillerRequest): Observable<FilteredResponce> {
		return this.httpClient.post<FilteredResponce>(this.baseUrl + 'movies/getFilteredMovies',reques);
	}

}