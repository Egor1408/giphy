import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IGifListData } from "../models/gif.model";

@Injectable({
	providedIn: 'root'
})

export class GiphyService {

	constructor(private http: HttpClient) {}

	getGifsList(request: string): Observable<IGifListData> {
		return this.http.get<IGifListData>(environment.baseUrl, {
			params: new HttpParams()
				.set('api_key', environment.apiKey)
				.set('q', request)
				.set('limit', 10)
				.set('offset', 0) //??????
				.set('rating', 'g') //g, pg, pg-13, r
				.set('lang', 'en') //en, de, ru, ua
		})
	}
	
	search$ = new Observable<Event>(observer => {
		const search = document.getElementById('search');
		
		if (!search) {
			observer.error('NULL');
			return
		}
		search.addEventListener('input', (e) => {
			observer.next(e);
		})
	})
}