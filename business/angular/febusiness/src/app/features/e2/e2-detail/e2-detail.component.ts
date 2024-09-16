import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCompanyService } from '../../../core/services/user-company.service';
import { Employee } from '../../../core/models/employee.model';
import { EmployeeService } from '../../../core/services/employee.service';
import { Area } from '../../../core/models/area.model';
import { AreaService } from '../../../core/services/area.service';
import { UtilsService } from '../../../core/utils.service';

@Component({
  selector: 'app-e2-detail',
  templateUrl: './e2-detail.component.html',
  styleUrl: './e2-detail.component.css'
})
export class E2DetailComponent implements OnInit {

  employeeForm!: FormGroup;
  private employeeCopy!: Employee;
  //employee: Employee = new Employee();
  currentArea!: number | null;
  currentManager!: number | null;
  isEditArea: number = 0;
  isEditManager: number= 0;   
  isUpdated: number = 0;
  showSaveDialog = false;
  showDeleteDialog = false; 
  ischange : boolean = false;

  @Input("employee") employee!: Employee;
  @Output("reload") reload = new EventEmitter<boolean>();
  

  constructor(
    private fb: FormBuilder, 
    private employeeService: EmployeeService, 
    private userCompanyService: UserCompanyService,
    private areaService : AreaService,
    private utils : UtilsService
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

    this.employeeService.setSelectedEmployee(this.employee);

    if(!this.employee){
      this.employee = new Employee();
    }
    else{
      this.currentArea = this.employee.areaid;
      this.currentManager = this.employee.managerid;
      this.employee.startedAt = this.employee.startedAt != null ? this.utils.formatDate(this.employee.startedAt, true) : null;
      this.employee.endedAt = this.employee.endedAt != null ? this.utils.formatDate(this.employee.endedAt, true) : null;
    }

    this.employeeForm.patchValue({
      ...this.employee
    });
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
    _ep.startedAt  = this.employee.startedAt != null ? this.utils.formatDate(this.employeeCopy.startedAt, false) : null;
    _ep.endedAt = this.employee.endedAt != null ? this.utils.formatDate(this.employeeCopy.endedAt, false) : null;


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
          this.currentManager = null;
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
    this.employee.startedAt = this.employee.startedAt != null ? this.utils.formatDate(this.employeeCopy.startedAt, true) : null;
    this.employee.endedAt = this.employee.endedAt != null ? this.utils.formatDate(this.employeeCopy.endedAt, true) : null;

    this.currentArea = this.employee.areaid;
    this.currentManager = this.employee.managerid;
    //this.isEditArea = this.isEditArea + 1;
    //this.isEditManager = this.isEditManager + 1 ;

    console.log("this.employee:", this.employee);

    this.employeeForm.patchValue({
      ...this.employee
    });
  }

  newObject(form: FormGroup): void {
    this.employee = new Employee();
    this.currentArea = null;
    this.currentManager = null;
    //this.isEditArea = this.isEditArea + 1;
    //this.isEditManager = this.isEditManager + 1 ;
    form.patchValue(this.employee);
  }

  /*selectEmployee(_employee: Employee): void {
    
    this.employeeCopy = { ..._employee };
    this.employee = {...this.employeeCopy};

    //this.currentArea = _employee.areaid;
    //this.currentEmployee = _employee.managerid;

    _employee.startedAt = _employee.startedAt != null ? this.formatDate(_employee.startedAt, true): null;
    _employee.endedAt = _employee.endedAt != null ? this.formatDate(_employee.endedAt, true): null;

    this.employeeForm.patchValue({
      ..._employee
    });
  }*/

  onAreaSelected(_idarea: number): void {
    //console.log('Área selecionada: ', _idarea);
    this.currentArea = _idarea;
    this.employee.areaid = _idarea;
    this.employee.area = this.areaService.findById(_idarea) ? this.areaService.findById(_idarea) as Area : new Area();
    //this.isEditArea = this.isEditArea + 1;
      /*this.employeeForm.patchValue({
      startedAt: this.employee.startedAt != null ? this.formatDate(this.employee.startedAt, true): null, 
      endedAt: this.employee.endedAt != null ? this.formatDate(this.employee.endedAt, true) : null,
      area: this.currentArea,
      areaid: _idarea
    });*/
  }

  onEmployeeSelected(_idemployee: number): void {
    console.log('Employee selected: ', _idemployee);
    
    this.currentManager = _idemployee != 0 ? _idemployee : null;
    
    this.employee.managerid = _idemployee != 0 ? _idemployee : null;
    this.employee.manager = this.employeeService.findById(_idemployee) ? this.employeeService.findById(_idemployee) as Employee : new Employee();
    
    //this.isEditManager = this.isEditManager + 1 ;
    console.log("this.employee: ", this.employee);
    /*this.employeeForm.patchValue({
      startedAt: this.employee.startedAt != null ? this.formatDate(this.employee.startedAt, true): null, 
      endedAt: this.employee.endedAt != null ? this.formatDate(this.employee.endedAt, true) : null,
      employee: this.currentEmployee,
      managerid: _idemployee
    });*/
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
    this.employee = new Employee()
  }

  cancelDelete() {
    this.showDeleteDialog = false;
  }

}
