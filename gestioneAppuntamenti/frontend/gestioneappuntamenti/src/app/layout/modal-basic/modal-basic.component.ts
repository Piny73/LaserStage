import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-modal-basic',
	templateUrl: './modal-basic.component.html',
	styleUrls: ['./modal-basic.component.css']
})
export class ModalBasicComponent implements OnInit {
	@Input() title: string = 'Modale di Base';
	@Input() bodyContent: string = 'Contenuto del modale';

	ngOnInit(): void {
		// Inizializza il modale se necessario
		// For example, you might use jQuery or Bootstrap's JavaScript API
	}
}
