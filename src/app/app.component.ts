import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, observeOn } from 'rxjs/operators';
import {GiphyService} from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

	public data: any = [];
	public limit: number = 10;
	public search: string = 'Hello'
	private search$ = new Observable<Event>(observer => {
		const search = document.getElementById('search');
		
		if (!search) {
			observer.error('NULL');
			return
		}
		search.addEventListener('input', (e) => {
			observer.next(e);
		})
	});

	private limit$ = new Observable<Event>(observer => {
		const limit = document.getElementById('limit');

		if (!limit) {
			observer.error('NULL');
			return
		}

		limit.addEventListener('change', (e) => {
			observer.next(e);
		})
	})

	constructor(private giphyService: GiphyService) {}

	ngOnInit() {
		this.getList(this.search, this.limit);

		this.search$
			.pipe(
				map(event => (event.target as HTMLInputElement).value),
				debounceTime(500),
				distinctUntilChanged(),
			)
			.subscribe({
				next: value => {
					this.search = value
					this.getList(this.search, this.limit)
				},
				complete: () => console.log('complete'),
				
				error: err => console.log(err)	
			});
		
		this.limit$
			.pipe(
				map(event => +(event.target as HTMLSelectElement).value),
				distinctUntilChanged(),
			)
			.subscribe({
				next: value => {
					this.limit = value;
					this.getList(this.search, this.limit)
				}
		})
	}

	private getList(search, limit) {
		this.giphyService.getGifsList(search, limit)
			.subscribe({
				next: (value => {
					this.data = value?.data!;			
				})
			})
	}

	

	
}

