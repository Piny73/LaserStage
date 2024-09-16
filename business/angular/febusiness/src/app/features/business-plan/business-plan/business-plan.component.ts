import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusinessPlan } from '../../../core/models/business-plan.model';
import { BusinessPlanService } from '../../../core/services/business-plan.service';
import { UserCompanyService } from '../../../core/services/user-company.service';

@Component({
  selector: 'app-business-plan',
  templateUrl: './business-plan.component.html',
  styleUrls: ['./business-plan.component.css']
})
export class BusinessPlanComponent implements OnInit {

  businessPlanForm!: FormGroup;
  private businessPlanCopy!: BusinessPlan;
  businessPlan: BusinessPlan = new BusinessPlan();
  isUpdated: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private businessPlanService: BusinessPlanService, 
    private userCompanyService: UserCompanyService) {}

  ngOnInit(): void {
    this.businessPlanForm = this.fb.group({
      id: [null],
      strategy: ['', Validators.required],
      responsible: ['', Validators.required],
      startYear: ['', Validators.required],
      yearsPlanning: ['', [Validators.required, Validators.min(1)]],
      wacc: ['', [Validators.required, Validators.min(0)]],
      tir: ['', [Validators.required, Validators.min(0)]],
      conclusion: [false, Validators.required],
      inWork: [false]
    });
  }

  onSubmit(): void {
    if (this.businessPlanForm.valid) {
      const businessPlan: BusinessPlan = this.businessPlanForm.value;
      console.log('Business Plan data:', businessPlan);
      this.save(businessPlan);
    } else {
      console.log('Form is invalid');
    }
  }

  save(businessPlan: BusinessPlan) {
    const _bp = { ...businessPlan };

    if (_bp.id) {
      if (_bp.id !== 0) {
        console.log("Updating Business Plan");

        this.businessPlanService.update(_bp).subscribe({
          next: (response: BusinessPlan) => {
            console.log('Update Business Plan Ok', response);
            this.isUpdated = true;
          },
          error: (error) => {
            console.error('Error updating Business Plan', error);
            alert('Erro ao atualizar Business Plan. Verifique o console para mais detalhes.');
          }
        });

      } else {
        console.log("Update Business Plan sem ID");
      }
    } else {
      console.log("Creating Business Plan");
      
      _bp.companyid = this.userCompanyService.getMainCompany().id;

      this.businessPlanService.create(_bp).subscribe({
        next: (response: BusinessPlan) => {
          console.log('Create Business Plan Ok', response);
          this.isUpdated = true;
        },
        error: (error: any) => {
          console.error('Error creating Business Plan', error);
          alert('Erro ao criar Business Plan. Verifique o console para mais detalhes.');
        }
      });
    }
  }

  resetForm(form: FormGroup): void {
      this.businessPlan = this.businessPlanCopy;
      form.patchValue(this.businessPlan);
  }

  newObject(form: FormGroup): void {
    this.businessPlan = new BusinessPlan();
    form.patchValue(this.businessPlan);
  }

  selectBusinessPlan(businessPlan: BusinessPlan): void {
    //console.log("selected bp: ", businessPlan)
    this.businessPlanCopy = { ...businessPlan };
    this.businessPlan = this.businessPlanCopy;
    this.businessPlanForm.patchValue(this.businessPlan);
  }
}
