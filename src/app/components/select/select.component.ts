import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
	@Input() class: string;
	@Input() name: string;
	@Input() value: any;

	constructor() { }

	ngOnInit(): void {
	}

}
