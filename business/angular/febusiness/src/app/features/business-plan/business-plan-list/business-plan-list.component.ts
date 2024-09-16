import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { BusinessPlan } from '../../../core/models/business-plan.model';
import { BusinessPlanService } from '../../../core/services/business-plan.service';
import { Observable, Subscription } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';

interface BusinessPlanData {
  loading: boolean;
  businessPlanList: BusinessPlan[] | null;
  error: string | null;
}

@Component({
  selector: 'app-business-plan-list',
  templateUrl: './business-plan-list.component.html',
  styleUrls: ['./business-plan-list.component.css']
})
export class BusinessPlanListComponent implements OnInit, OnDestroy {

  @Output() onSelectBusinessPlan = new EventEmitter<BusinessPlan>();
  @Input() isUpdated!: boolean;

  title = 'Business Plan';
  businessPlanData$!: Observable<BusinessPlanData>;
  selectedBusinessPlan!: BusinessPlan;
  private subscription!: Subscription;

  constructor(private businessPlanService: BusinessPlanService) {}

  ngOnInit() {
    this.loadBusinessPlans();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isUpdated'] && changes['isUpdated'].currentValue) {
      this.loadBusinessPlans();
    }
  }

  loadBusinessPlans(): void {
    this.businessPlanData$ = this.businessPlanService.fill().pipe(
      map((data: BusinessPlan[]) => {
        return {
          loading: false,
          businessPlanList: data,
          error: null
        };
      }),
      catchError(error => {
        console.error('Erro ao carregar Business Plans:', error);
        return [{
          loading: false,
          businessPlanList: null,
          error: 'Erro ao carregar Business Plans.'
        }];
      }),
      startWith({ loading: true, businessPlanList: null, error: null })
    );

    this.subscription = this.businessPlanData$.subscribe(data => {
      if (data.businessPlanList) {
        this.selectedBusinessPlan = this.businessPlanService.getSelectedBusinessPlan();
        console.log("Load Main BP Selected: ", this.selectedBusinessPlan);

        if(data.businessPlanList.length == 1){
          this.selectBusinessPlan(this.businessPlanService.getSelectedBusinessPlan());
        }

      }
    });
  }

  selectBusinessPlan(bp: BusinessPlan) {
    const bpCopy = { ...bp };
    //console.log("selected bp table: ", bpCopy)
    this.onSelectBusinessPlan.emit(bpCopy);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
