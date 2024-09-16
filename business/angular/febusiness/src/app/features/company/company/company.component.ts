import { Component, EventEmitter, Input, OnInit, Output, OutputEmitterRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../../../core/models/company.model';
import { CompanyService } from '../../../core/services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  
  companyForm!: FormGroup;
  private companycopy!: Company;
  company!: Company;
  isUpdated: boolean = false;

  constructor(private fb: FormBuilder, private companyService: CompanyService) {
    this.company = new Company();
  }
 
  ngOnInit(): void {
    this.companyForm = this.fb.group({
      id: [null],
      version: [null],
      name: ['', Validators.required],
      socialName: ['', Validators.required],
      responsible: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      foundedin: ['', Validators.required],
      legaltype: ['', Validators.required],
      legalnumber: ['', Validators.required],
      businessplan: [false]
    });
  }

  onSubmit(): void {
    if (this.companyForm.valid) {
      const company: Company = this.companyForm.value;
      console.log('Company data:', company);
      this.save(company);
    }
  }

  save(company: Company): void {
    let _company = Object.assign({}, company);
    if (_company.id) {
      if (_company.id != 0) {
        console.log("Updateing");
        this.companyService.update(_company).subscribe({
          next: (response: any) => {
            console.log('UpdateCompany Ok', response);  
            this.isUpdated = true;
            this.company = new Company(); 
          },
          error: (error) => {
            console.error('Erro no updateCompany', error);
          }
        });
  
      } else {
        alert("Create");
      }
    } else {
      console.log("Company ID is null");
    }
  }

  resetForm(form: any): void {
    if (this.company.id === 0) {
      this.company = new Company();
      form.reset();
    } else {
      this.company = this.companycopy;
      this.companyForm.patchValue(this.company);
    }
  }

  selectCompany(company: Company): void {
    this.companycopy = Object.assign({}, company);
    this.company = this.companycopy;
    this.companyForm.patchValue(this.company);
  }
}

