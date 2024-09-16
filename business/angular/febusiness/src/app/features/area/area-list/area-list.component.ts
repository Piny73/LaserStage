import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { Area } from '../../../core/models/area.model';
import { AreaService } from '../../../core/services/area.service';
import { EmployeeService } from '../../../core/services/employee.service';

interface AreaData {
  loading: boolean;
  areaList: Area[] | null;
  error: string | null;
}

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrl: './area-list.component.css'
})
export class AreaListComponent  implements OnInit, OnDestroy {
  @Output() onSelectArea = new EventEmitter<Area>();
  @Input() isUpdated!: boolean;

  title = 'Area';
  areaData$!: Observable<AreaData>;
  selectedArea!: Area;
  private subscription!: Subscription;

  constructor(
    private areaService: AreaService, 
    private employeeService: EmployeeService) {}

  ngOnInit() {
    this.load();
  }

  ngOnChanges(changes: SimpleChanges) {
    //console.log("onChange1: ", changes);
    if (changes['isUpdated'].currentValue) {
      //console.log("onChange2: ", changes);
      this.load();
    }

    if (changes['selectedArea'] && this.selectedArea) {
      this.selectArea(this.selectedArea);
    }

  }

  load(): void {
    console.log("onChange3 -> Load");
    this.areaData$ = this.areaService.fill().pipe(
      map((data: Area[]) => {
        return {
          loading: false,
          areaList: data,
          error: null
        };
      }),
      catchError(error => {
        console.error('Erro ao carregar Areas:', error);
        return [{
          loading: false,
          areaList: null,
          error: 'Erro ao carregar Areas.'
        }];
      }),
      startWith({ loading: true, areaList: null, error: null })
    );
  }

  selectArea(area: Area) {
    const areaCopy = { ...area };
    //console.log("Area table emit: ", areaCopy);
    this.onSelectArea.emit(areaCopy);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
