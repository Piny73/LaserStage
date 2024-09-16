import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Company } from '../../../core/models/company.model';
import { CompanyService } from '../../../core/services/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.css'
})
export class CompanyListComponent {

  title = 'Companies';
  companyList: Company[] = [];
  @Output('onSelectCompany') onSelectCompany = new EventEmitter<Company>();
  @Input('isUpdated') isUpdated! : boolean;

  constructor(private companyService: CompanyService) {
    this.companyList = this.companyService.getCompanyList();
  }


  selectCompany(company: Company) {
    const companyCopy = Object.assign({}, company);
    //console.log(companyCopy);
    this.onSelectCompany.emit(companyCopy);
    
  }

  isDataChanged(): boolean {
    // Sua lógica para verificar se os dados foram alterados
    console.log('isDataChanged called');
    return true; // Exemplo
  }

  ngOnChanges(changes: SimpleChanges): void {
    //console.log("onchanges");
    if (changes['isUpdated'] && changes['isUpdated'].currentValue) {
      this.reloadCompanies();
    }
  }

  reloadCompanies(): void {
    //console.log("reload")
    this.companyService.fill().subscribe({
      next: (_companies: Company[]) => {
        this.companyList = _companies;
        this.isUpdated = false;
      },
      error: (error) => console.error('Erro ao carregar empresas', error)
    });
  }

}