import { Component, OnInit } from '@angular/core';
import { Appuntamento } from '../../../core/models/appuntamento.model';
import { AppuntamentoService } from '../../../core/services/appuntamento.service';

@Component({
  selector: 'app-appuntamenti-list',
  templateUrl: './appuntamenti-list.component.html',
  styleUrl: './appuntamenti-list.component.css'
})
export class AppuntamentiListComponent implements OnInit {
  appuntamenti: Appuntamento[] = [];

  constructor(private appuntamentoService: AppuntamentoService) { }

  ngOnInit(): void {
    this.loadAppuntamenti();
  }

  loadAppuntamenti() {
    this.appuntamentoService.getAppuntamenti().subscribe(data => {
      this.appuntamenti = data;
    });
  }
}
