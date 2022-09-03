import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
	@Input() imgUrl: string;
	@Input() imgName: string;
	@Output() method = new EventEmitter();

	constructor() { }

	ngOnInit(): void {
	}

	public closeModal() {
		this.method.emit()
	}
}
