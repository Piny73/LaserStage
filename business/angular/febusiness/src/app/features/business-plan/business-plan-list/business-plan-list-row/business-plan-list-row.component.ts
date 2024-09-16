import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { BusinessPlan } from '../../../../core/models/business-plan.model';
import { BusinessPlanService } from '../../../../core/services/business-plan.service';

@Component({
  selector: 'tr[app-business-plan-list-row]',
  templateUrl: './business-plan-list-row.component.html',
  styleUrls: ['./business-plan-list-row.component.css']
})
export class BusinessPlanListRowComponent implements OnChanges {

  @Input('bp-data') bp!: BusinessPlan;
  @Input('bp-selected') bpSelected!: BusinessPlan;
  @Output('onSelectBusinessPlan') onSelectBusinessPlan = new EventEmitter<BusinessPlan>();

  _selected: boolean = false;
  _copyBPSelected!: BusinessPlan;
  showDialog: boolean = false;

  constructor(private businessPlanService: BusinessPlanService) {}

  ngOnChanges(changes: SimpleChanges): void {
    // Verifica se os dados do BusinessPlan foram alterados e se estão disponíveis
    if (changes['bp'] && this.bp) {
      this.initializeSelection();
    }
  }

  initializeSelection() {
    if (this.bpSelected) {
      this._copyBPSelected = { ...this.bpSelected };
      this._selected = this.bp.id === this.bpSelected.id;
      
      if (this._selected){

        //console.log("selected bp row: ", this._copyBPSelected)
        this.onSelectBusinessPlan.emit(this._copyBPSelected);

      }
    }
  }

  openChangeDialog(event: Event) {
    event.preventDefault();
    if (!this.bp) {
      console.warn('Attempted to open dialog before BP data is available');
      return;
    }
    console.log('Selected:', this.bp);
    this.showDialog = true;
  }

  confirmChange() {

    console.log("BP Service Selected: ", this.businessPlanService.getSelectedBusinessPlan());
    console.log("Row Selected: ", this.bp);

    if (this.bp && this.businessPlanService.getSelectedBusinessPlan()) {
      if (this.businessPlanService.getSelectedBusinessPlan().id !== this.bp.id) {
        this.businessPlanService.changeMainBP(this.bp);
        this._copyBPSelected = { ...this.bp };
        this._selected = true;
        console.log('Main BP Changed:', this.businessPlanService.getSelectedBusinessPlan());
        this.onSelectBusinessPlan.emit(this.bp);
      }
    } else {
      console.warn('BusinessPlan or selectedBusinessPlan is not defined.');
    }
  
    this.showDialog = false; // Fechar o diálogo após a operação
  }
  
  

  cancelChange() {
    // Fechar o diálogo
    this.showDialog = false;
  
    // Verificar se o plano selecionado atualmente é o mesmo do serviço
    if (this.businessPlanService.getSelectedBusinessPlan() && this.bp) {
      this._selected = this.businessPlanService.getSelectedBusinessPlan().id === this.bp.id;
    } else {
      console.warn('BusinessPlan or selectedBusinessPlan is not defined.');
      this._selected = false; // Garantir que não esteja selecionado se houver algum problema
    }
  }
  
}
