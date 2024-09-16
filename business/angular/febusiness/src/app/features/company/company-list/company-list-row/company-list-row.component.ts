import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Company } from '../../../../core/models/company.model';
import { CompanyService } from '../../../../core/services/company.service';

@Component({
  selector: 'tr [app-company-list-row]',
  templateUrl: './company-list-row.component.html',
  styleUrls: ['./company-list-row.component.css']
})
export class CompanyListRowComponent implements OnInit {
  @Input('company-data') company!: Company;
  @Input('company-selected') companySelected!: Company;
  @Output('onSelectCompany') onSelectCompany = new EventEmitter<Company>();
  _selected: boolean = false;
  _copyCompanySelected!: Company; 
  showDialog: boolean = false;
  

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.initializeSelection();
  }

  initializeSelection() {
    if(this.companySelected){
      this.companySelected = this.companyService.selectedCompany;
      this._copyCompanySelected = this.companyService.selectedCompany;
      this._selected = true;
    }
    
  }

  openChangeCompanyDialog(event: Event) {
    event.preventDefault();
    console.log("Selected: ",this.company);
    this.showDialog = true;
  }

  confirmCompanyChange() {
    if (this.companyService.selectedCompany != this.company){
      // this.companyService.selectedCompany = this.company;
      this.companyService.changeMainCompany(this.company);
      this._copyCompanySelected = this.company;
      this._selected = true;
      console.log("Main CompanyChanged:", this.companyService.selectedCompany);
      this.onSelectCompany.emit(this.company);
    }
    this.showDialog = false;
    
  }

  cancelCompanyChange() {
    this.showDialog = false;
    this._selected = false;
    console.log("Main Company:", this.companyService.selectedCompany);
    this.onSelectCompany.emit(this.company);
  }
}
