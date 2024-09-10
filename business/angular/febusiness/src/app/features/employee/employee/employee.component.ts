import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCompanyService } from '../../../core/services/user-company.service';
import { Employee } from '../../../core/models/employee.model';
import { EmployeeService } from '../../../core/services/employee.service';
import { Area } from '../../../core/models/area.model';
import { AreaService } from '../../../core/services/area.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  employeeForm!: FormGroup;
  private employeeCopy!: Employee;
  employee: Employee = new Employee();
  currentArea!: number;
  isEditMode: boolean = false;   
  isUpdated: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private employeeService: EmployeeService, 
    private userCompanyService: UserCompanyService,
    private areaService : AreaService
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      employeeRole: ['', Validators.required],
      area: [''],
      salary: ['', Validators.required],
      startedAt: ['', Validators.required],
      endedat: ['', Validators.required],
      user: [''],
      manager: ['']
     });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const _employee: Employee = this.employeeForm.value;
      //this.employee.area = this.areaService.findById(this.currentArea) ? this.areaService.findById(this.currentArea) as Area : new Area();
      console.log('Employee data:', _employee);
      this.save(_employee);
    } else {
      console.log('Form is invalid');
    }
  }

  save(_employee: Employee) {
    const _ep = { ..._employee };

    if (_ep.id) {
      if (_ep.id !== 0) {
        console.log("Updating Employee");

        this.employeeService.update(_ep).subscribe({
          next: (response: Employee) => {
            console.log('Update Employee Ok', response);
            this.isUpdated = true;
          },
          error: (error) => {
            console.error('Error updating Employee', error);
            alert('Erro ao atualizar Employee. Verifique o console para mais detalhes.');
          }
        });

      } else {
        console.log("Update Employee sem ID");
      }
    } else {
      console.log("Creating Employee");
      
      _ep.company = this.userCompanyService.getMainCompany();

      this.employeeService.create(_ep).subscribe({
        next: (response: Employee) => {
          console.log('Create Employee Ok', response);
          this.isUpdated = true;
        },
        error: (error: any) => {
          console.error('Error creating Employee', error);
          alert('Erro ao criar Employee. Verifique o console para mais detalhes.');
        }
      });
    }
  }

  resetForm(form: FormGroup): void {
      this.employee = this.employeeCopy;
      form.patchValue(this.employee);
  }

  newObject(form: FormGroup): void {
    this.employee = new Employee();
    form.patchValue(this.employee);
  }

  selectEmployee(_employee: Employee): void {
    console.log("selected ep 1: ", _employee);
    this.employeeCopy = { ..._employee };
    this.employee = this.employeeCopy;
    console.log("Area Employed: ", this.employee.areaid);
    this.currentArea = _employee.areaid;

    this.employeeForm.patchValue(_employee);

  }

  onAreaSelected(_idarea: number): void {
    console.log('Área selecionada: ', _idarea);
    this.isEditMode = true;
    this.currentArea = _idarea;
    this.employee.area = this.areaService.findById(_idarea) ? this.areaService.findById(_idarea) as Area : new Area();
        this.employeeForm.patchValue({
      area: this.currentArea
    });
  }
  

}

