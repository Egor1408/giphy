import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {GiphyService} from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
	public data: any = []

	

	constructor(private giphyService: GiphyService) {}

	ngOnInit() {
		this.giphyService.search$
			.pipe(
				map(event => (event.target as HTMLInputElement).value),
				debounceTime(500),
				distinctUntilChanged(),
			)
			.subscribe({
				next: value => {
					this.getList(value)
				},
				complete: () => console.log('complete'),
				
				error: err => console.log(err)	
			});
	}

	private getList(search) {
		this.giphyService.getGifsList(search)
			.subscribe({
				next: (value => {
					this.data = value?.data!;			
				})
			})
	}

	

	
}

