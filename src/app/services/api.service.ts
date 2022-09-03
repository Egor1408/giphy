import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IGifListData } from "../models/gif.model";

@Injectable({
	providedIn: 'root'
})

export class GiphyService {

	constructor(private http: HttpClient) {}

	getGifsList(request: string, limit: number, rating: string): Observable<IGifListData> {
		return this.http.get<IGifListData>(environment.baseUrl, {
			params: new HttpParams()
				.set('api_key', environment.apiKey)
				.set('q', request)
				.set('limit', limit)
				.set('offset', 0) //??????
				.set('rating', rating) //g, pg, pg-13, r
				.set('lang', 'ru') //en, de, ru, ua
		})
	}
}