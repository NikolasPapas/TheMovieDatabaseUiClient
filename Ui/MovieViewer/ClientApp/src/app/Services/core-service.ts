import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FilteredResponse } from "../models/filtered-response";
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

	GetMovieFilteredList(reques:FrillerRequest): Observable<FilteredResponse> {
		return this.httpClient.post<FilteredResponse>(this.baseUrl + 'movies/getFilteredMovies',reques);
	}

}