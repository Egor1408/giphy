import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { map, debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {GiphyService} from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit {

	public data: any = [];
	public limit: number = 10;
	public limitValue: number[] = [10, 20, 30];
	public rating: string = 'g';
	public ratingValue: string[] = ['g', 'pg', 'pg-13', 'r'];
	public search: string = 'Hello';
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

	private rating$ = new Observable<Event>(observer => {
		const rating = document.getElementById('rating');

		if (!rating) {
			observer.error('NULL');
			return
		}

		rating.addEventListener('change', (e) => {
			observer.next(e);
		})
	})

	constructor(private giphyService: GiphyService) {}

	ngOnInit() {
		this.getList(this.search, this.limit, this.rating);
	}

	ngAfterViewInit() {
		this.search$
			.pipe(
				map(event => (event.target as HTMLInputElement).value),
				debounceTime(500),
				distinctUntilChanged(),
			)
			.subscribe({
				next: value => {
					this.search = value
					this.getList(this.search, this.limit, this.rating)
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
					this.getList(this.search, this.limit, this.rating)
				}
		})

		this.rating$
			.pipe(
				map(event => (event.target as HTMLSelectElement).value),
				distinctUntilChanged(),
			)
			.subscribe({
				next: value => {
					this.rating = value;
					this.getList(this.search, this.limit, this.rating)
				}
		})
	}

	private getList(search, limit, rating) {
		this.giphyService.getGifsList(search, limit, rating)
			.subscribe({
				next: (value => {
					console.log(value.data);					
					this.data = value?.data!;			
				})
			})
	}

	

	
}

