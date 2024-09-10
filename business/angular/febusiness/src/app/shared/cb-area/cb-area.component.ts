import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Area } from '../../core/models/area.model';
import { AreaService } from '../../core/services/area.service';

@Component({
  selector: 'app-cb-area',
  templateUrl: './cb-area.component.html',
  styleUrl: './cb-area.component.css'
})

export class CbAreaComponent implements OnInit {

  @Input("selectedItem") selectedItem : number | null = null;
  @Input("isUpdate") isUpdate: boolean = false;
  @Output() selectedItemChange: EventEmitter<number> = new EventEmitter<number>();         
  areaList: Area[] = [];   

  constructor(private areaService: AreaService) {}

  ngOnInit(): void {
      this.areaList = this.areaService.getAreaList();
      this.updateSelectedArea()
  }

  ngOnChanges(changes: SimpleChanges): void {
    //console.log("onChange CB 1", changes);
    const _update = changes['isUpdate']?.currentValue ? true: false;
    const _s_cv = changes['selectedItem']?.currentValue ? changes['selectedItem']?.currentValue : -1;
    const _s_pv = changes['selectedItem']?.previousValue ? changes['selectedItem']?.previousValue : -1;

    // Verifica se os objetos não são nulos/undefined
    if (_update || _s_cv != _s_pv ) {
      console.log("onChange CB 2", changes);
      this.updateSelectedArea();
    }
  }

  onAreaSelected(event: any) {
    const selectedId = event.target.value;
    this.selectedItem = this.areaList.find(area => area.id === parseInt(selectedId, 10))?.id|| 0;
    this.selectedItemChange.emit(this.selectedItem);
  }

  updateSelectedArea(): void {
    //console.log("onChange CB 3");
    //console.log("onChange CB 3", this.selectedItem);
    if(this.selectedItem) {
      const selectedArea = this.areaList.find(area => area.id == this.selectedItem);
      //console.log("onUpdateSelectArea: ", selectedArea);
      if (selectedArea) {
        //console.log("onChange CB 4", selectedArea);
        this.selectedItem = selectedArea.id;
      }
    }
    else{
      //console.log("onChange CB 5");
      this.selectedItem = -1;
    }
  }
}