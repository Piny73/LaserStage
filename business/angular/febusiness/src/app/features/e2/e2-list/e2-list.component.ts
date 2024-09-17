import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, SimpleChanges, OnChanges, TemplateRef, ViewEncapsulation, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { Employee } from '../../../core/models/employee.model';
import { EmployeeService } from '../../../core/services/employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface EmployeeData {
  loading: boolean;
  employeeList: Employee[] | null;
  error: string | null;
}

@Component({
  selector: 'app-e2-list',
  templateUrl: './e2-list.component.html',
  styleUrl: './e2-list.component.css',
  encapsulation: ViewEncapsulation.None
})
export class E2ListComponent implements OnInit, OnDestroy, OnChanges {
  private modalService = inject(NgbModal);

  @Output() onSelectEmployee = new EventEmitter<Employee>();
  @Input() isUpdated!: number;

  title = 'Employee';
  employeeData$!: Observable<EmployeeData>;
  selectedEmployee!: Employee;
  private subscription!: Subscription;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.load();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("employee list changes: ", changes['isUpdated']);
    console.log("selected changes: ", changes['selectedEmployee']);
    let cur_up = changes['isUpdated'].currentValue != null ? changes['isUpdated'].currentValue : 0;
    let cur_last = changes['isUpdated'].previousValue != null ? changes['isUpdated'].previousValue : 0;

    if (cur_up > cur_last) {
      this.load();
    }
      // Adicionar lógica para responder a seleção de funcionário
    if (changes['selectedEmployee'] && this.selectedEmployee) {
      this.selectEmployee(this.selectedEmployee);
    }
  }

  load(): void {
    this.employeeData$ = this.employeeService.fill().pipe(
      map((data: Employee[]) => {
        return {
          loading: false,
          employeeList: data,
          error: null
        };
      }),
      catchError(error => {
        console.error('Erro ao carregar Business Plans:', error);
        return [{
          loading: false,
          employeeList: null,
          error: 'Erro ao carregar Business Plans.'
        }];
      }),
      startWith({ loading: true, employeeList: null, error: null })
    );

    this.subscription = this.employeeData$.subscribe(data => {
      if (data.employeeList) {
        this.selectedEmployee = this.employeeService.getSelectedEmployee();
        if(data.employeeList.length == 1){
          this.selectEmployee(this.employeeService.getSelectedEmployee());
        }

      }
    });
  }

  selectEmployee(ep: Employee) {
    this.selectedEmployee = { ...ep};
    console.log("selected row employee table: ", this.selectedEmployee)
    //this.onSelectEmployee.emit(epCopy);
    
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  openDetail(content: TemplateRef<any>) {
		this.modalService.open(content, { size: 'xl' });
	}

  reload(load : boolean){
    this.modalService.dismissAll();
    console.log("reload.0");
    if(load){
      console.log("Reload.1");
      this.load();
    }
  }

}
