import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  currentArea!: number | null;
  currentEmployee!: number | null;
  isEditArea: number = 0;
  isEditManager: number= 0;   
  isUpdated: number = 0;
  showSaveDialog = false;
  showDeleteDialog = false; 

  @Output("changeArea") cb_employee_change = new EventEmitter<number>();
  

  constructor(
    private fb: FormBuilder, 
    private employeeService: EmployeeService, 
    private userCompanyService: UserCompanyService,
    private areaService : AreaService
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      id: [null],
      companyid:[null],
      managerid:[null],
      areaid:[null],
      name: ['', Validators.required],
      employeeRole: ['', Validators.required],
      area: [''],
      salary: ['', Validators.required],
      startedAt: ['', Validators.required],
      endedAt: [''],
      user: [''],
      manager: ['']
    });

    this.employeeService.setSelectedEmployee(null);
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      this.employee = this.employeeForm.value;
      this.openSaveConfirmation();
    } else {
      console.log('Form is invalid');
    }
  }
  

  save() {
    const _ep = { ...this.employee };

    _ep.area = null;
    _ep.manager = null;
    _ep.company = null;
    _ep.user = null;

    // Converte as datas para o formato do backend (dd-MM-yyyy)
    if (_ep.startedAt) {
      _ep.startedAt = this.formatDate(this.employee.startedAt, false);
    }

    if (_ep.endedAt || _ep.endedAt ==="")  {
      _ep.endedAt = this.formatDate(this.employee.endedAt, false);
    }

    if(_ep.areaid == 0){
      _ep.areaid = null;
      this.currentArea = null;
    }

    console.log("Employee update1", _ep);

    if (_ep.id) {
      if (_ep.id !== 0) {
        console.log("Updating Employee");

        this.employeeService.update(_ep).subscribe({
          next: () => {
            console.log('Update Employee Ok');
            console.log("Employee salvo, set selected: ", _ep);
            this.employeeService.setSelectedEmployee(_ep);
            this.isUpdated = this.isUpdated+1;
            console.log("isUpdate", this.isUpdated);
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
      console.log("Creating Employee: ", _ep);

      _ep.companyid = this.userCompanyService.getMainCompany().id;

      this.employeeService.save(_ep).subscribe({
        next: () => {
          console.log('Create Employee Ok');
        },
        error: (error: any) => {
          console.error('Error creating Employee', error);
          alert('Erro ao criar Employee. Verifique o console para mais detalhes.');
        }
      });

      //this.currentArea = null;
      //this.currentEmployee = null;
      //this.isEditArea = this.isEditArea + 1;
      //this.isEditManager = this.isEditManager + 1 ;
      //this.employeeService.setSelectedEmployee(null);

    }   
  }

  deleteObject() {
    const _ep = { ...this.employee };
  
    console.log("Delete request data", _ep);
    if (_ep.id && _ep.id !== 0) {
      console.log("Deleting Employee with ID:", _ep.id);
  
      this.employeeService.delete(_ep).subscribe({
        next: () => {
          console.log('Delete Employee successful');
          this.employee = new Employee();
          this.employeeCopy = new Employee();
          this.employeeForm.patchValue(this.employee);
          this.currentArea = null;
          this.currentEmployee = null;
          this.employeeService.setSelectedEmployee(null);
          this.isUpdated = this.isUpdated + 1;
        },
        error: (error) => {
          console.error('Error deleting Employee', error);
          alert('Error deleting Employee. Please check the console for details.');
        }
      });
  
    } else {
      console.warn("Attempted to delete Employee with invalid ID:", _ep.id);
    }
  }
  
  resetForm(form: FormGroup): void {
    this.employee = this.employeeCopy;
    this.employee.startedAt = this.employee.startedAt != null ? this.formatDate(this.employeeCopy.startedAt, true) : null;
    this.employee.endedAt = this.employee.endedAt != null ? this.formatDate(this.employeeCopy.endedAt, true) : null;

    //this.currentArea = this.employee.areaid;
    //this.currentEmployee = this.employee.managerid;
    this.isEditArea = this.isEditArea + 1;
    this.isEditManager = this.isEditManager + 1 ;


    console.log("this.employee:", this.employee);

    this.employeeForm.patchValue({
      ...this.employee
    });
  }

  newObject(form: FormGroup): void {
    this.employee = new Employee();
    //this.currentArea = null;
    //this.currentEmployee = null;
    this.isEditArea = this.isEditArea + 1;
    this.isEditManager = this.isEditManager + 1 ;
    form.patchValue(this.employee);
  }

  selectEmployee(_employee: Employee): void {
    
    this.employeeCopy = { ..._employee };
    this.employee = {...this.employeeCopy};

    //this.currentArea = _employee.areaid;
    //this.currentEmployee = _employee.managerid;

    _employee.startedAt = _employee.startedAt != null ? this.formatDate(_employee.startedAt, true): null;
    _employee.endedAt = _employee.endedAt != null ? this.formatDate(_employee.endedAt, true): null;

    this.employeeForm.patchValue({
      ..._employee
    });
  }

  onAreaSelected(_idarea: number): void {
    //console.log('Área selecionada: ', _idarea);
    this.currentArea = _idarea;
    this.employee.areaid = _idarea;
    this.employee.area = this.areaService.findById(_idarea) ? this.areaService.findById(_idarea) as Area : new Area();
    this.isEditArea = this.isEditArea + 1;
      this.employeeForm.patchValue({
      startedAt: this.employee.startedAt != null ? this.formatDate(this.employee.startedAt, true): null, 
      endedAt: this.employee.endedAt != null ? this.formatDate(this.employee.endedAt, true) : null,
      area: this.currentArea,
      areaid: _idarea
    });
  }

  onEmployeeSelected(_idemployee: number): void {
    console.log('Employee selected: ', _idemployee);
    this.currentEmployee = _idemployee != 0 ? _idemployee : null;
    this.employee.managerid = _idemployee != 0 ? _idemployee : null;
    if(this.employee.managerid){
      this.employee.manager = this.employeeService.findById(_idemployee) ? this.employeeService.findById(_idemployee) as Employee : new Employee();
    }
    this.isEditManager = this.isEditManager + 1 ;
    console.log("this.employee: ", this.employee);
    this.employeeForm.patchValue({
      startedAt: this.employee.startedAt != null ? this.formatDate(this.employee.startedAt, true): null, 
      endedAt: this.employee.endedAt != null ? this.formatDate(this.employee.endedAt, true) : null,
      employee: this.currentEmployee,
      managerid: _idemployee
    });
  }

  // Método atualizado para lidar com formatação de data (com / ou -)
  formatDate(_date: string | null, toFrontendFormat: boolean): string | null {
   
    if (!_date || _date.trim() === '') {
      console.error("data null:", _date);
      return null;  // Retorna null se a data for nula ou vazia
    }

    let day: string, month: string, year: string;
    
    // Detecta o separador de datas (/ ou -)
    const separator = _date.includes('/') ? '/' : '-';
    const parts = _date.split(separator);
    
    // Verifica se a data tem o formato correto e converte
    if (toFrontendFormat && parts.length === 3) {
      // Supondo que a data vinda do backend seja dd-MM-yyyy ou dd/MM/yyyy
      [day, month, year] = parts;
      if ((day && month && year) && day.length < 3) {
        return `${year}-${month}-${day}`;
      } else {
        console.warn("formato nao reconhecido:", _date);
        return _date;
      }
    } else if (!toFrontendFormat && parts.length === 3) {
      // Supondo que a data vinda do frontend seja yyyy-MM-dd
      [year, month, day] = parts;
      if ((day && month && year) && year.length > 2) {
        return `${day}/${month}/${year}`;
      } else {
        console.warn("formato nao reconhecido:", _date);
        return _date;
      }
    } else {
      console.error("Formato de data inválido:", _date);
      return null;
    }
  }

  openSaveConfirmation() {
    this.showSaveDialog = true;
  }

  openDeleteConfirmation() {
    this.showDeleteDialog = true;
  }

  confirmSave() {
    this.showSaveDialog = false;
    this.save(); 
  }

  cancelSave() {
    this.showSaveDialog = false;
  }

  confirmDelete() {
    this.showDeleteDialog = false;
    this.deleteObject(); 
  }

  cancelDelete() {
    this.showDeleteDialog = false;
  }

}
