import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCompanyService } from '../../../core/services/user-company.service';
import { Area } from '../../../core/models/area.model';
import { AreaService } from '../../../core/services/area.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { Employee } from '../../../core/models/employee.model';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrl: './area.component.css'
})
export class AreaComponent implements OnInit  {
  
  areaForm!: FormGroup;
  private areaCopy!: Area;
  area: Area = new Area();
  isUpdated: boolean = false;
  currentEmployee!: number;
  currentArea!: number;
  isEditEmployee: number = 0;  
  isEditModeArea: number = 0;  

  constructor(
    private fb: FormBuilder, 
    private areaService: AreaService, 
    private employeeService : EmployeeService,
    private userCompanyService: UserCompanyService) {}

  ngOnInit(): void {
    this.areaForm = this.fb.group({
      id: [null],
      responsableid: ['', Validators.required],
      description: ['', Validators.required],
      parentid: ['', Validators.required],
      employee: [''],
      });
      
  }

  onSubmit(): void {
    if (this.areaForm.valid) {
      const area: Area = this.areaForm.value;
      console.log('area data:', area);
      this.save(area);
    } else {
      console.log('Form is invalid');
    }
  }

  save(area: Area) {
    const _area = { ...area };

    if (_area.id) {
      if (_area.id !== 0) {
        console.log("Updating area");

        _area.companyid = this.userCompanyService.getMainCompany().id;

        this.areaService.update(_area).subscribe({
          next: (response: Area) => {
            console.log('Updatearea Ok', response);
            this.isUpdated = true;
          },
          error: (error) => {
            console.error('Error updating area', error);
            alert('Erro ao atualizar area. Verifique o console para mais detalhes.');
          }
        });

        this.selectArea(_area);

      } else {
        console.log("Update area sem ID");
      }
    } else {
      console.log("Creating area");
      
      _area.companyid = this.userCompanyService.getMainCompany().id;

      this.areaService.create(_area).subscribe({
        next: (response: Area) => {
          console.log('Create Area Ok', response);
          this.isUpdated = true;
          this.selectArea(_area);
        },
        error: (error: any) => {
          console.error('Error creating area', error);
          alert('Erro ao criar area. Verifique o console para mais detalhes.');
        }
      });
    }
  }

  resetForm(form: FormGroup): void {
      this.area = this.areaCopy;
      form.patchValue(this.area);
  }

  newObject(form: FormGroup): void {
    this.area = new Area();
    form.patchValue(this.area);
  }

  selectArea(area: Area): any {
    //console.log("selected area: ", area)
    this.areaCopy = { ...area };
    this.area = this.areaCopy;
    this.currentEmployee = area.responsibleid;
    this.currentArea = area.parentid;
    this.areaForm.patchValue(this.area);
  }

  onEmployeeSelected(_idemployee: number): void {
    console.log('Employee selected: ', _idemployee);
    this.isEditEmployee = this.isEditEmployee +1;
    this.currentEmployee = _idemployee;
    this.area.responsible = this.employeeService.findById(_idemployee) ? this.employeeService.findById(_idemployee) as Employee : new Employee();
    this.areaForm.patchValue({employee: this.currentEmployee});
  }

  onAreaSelected(_idarea: number): void {
    console.log('Área selecionada: ', _idarea);
    this.isEditModeArea = this.isEditModeArea + 1;
    this.currentArea = _idarea;
    this.area.parent = this.areaService.findById(_idarea) ? this.areaService.findById(_idarea) as Area : new Area();
        this.areaForm.patchValue({
      area: this.currentArea
    });
  }

}
