import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Area } from '../../core/models/area.model';
import { AreaService } from '../../core/services/area.service';

@Component({
  selector: 'app-cb-area',
  templateUrl: './cb-area.component.html',
  styleUrl: './cb-area.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CbAreaComponent implements OnInit {

  @Input("selectedArea") selectedItem : number | null = null;
  @Output("selectedItemChange") selectedItemChange: EventEmitter<number> = new EventEmitter<number>();         
  areaList: Area[] = [];   

  constructor(private areaService: AreaService) {}

  ngOnInit(): void {
      this.areaList = this.areaService.getAreaList();
  }

  
  ngOnChanges(changes: SimpleChanges): void {
    console.log("onChange CB Area");
    
    /*const _up_cur = changes['isUpdate']?.currentValue ? changes['isUpdate']?.currentValue : 0;
    const _up_pre = changes['isUpdate']?.previousValue ? changes['isUpdate']?.previousValue : 0;

    const _s_cv = changes['selectedItem']?.currentValue ? changes['selectedItem']?.currentValue : -1;
    const _s_pv = changes['selectedItem']?.previousValue ? changes['selectedItem']?.previousValue : -1;
    
    
    // Verifica se os objetos não são nulos/undefined
    if (changes['selectedItem']?.currentValue ) {
      //console.log("onChange CB 2", changes);
      this.updateSelected();
    }*/
  }


  onSelected(event: any) {
    if (event.target.value) {
      const selectedId = event.target.value;
      this.selectedItem = this.areaList.find(area => area.id === parseInt(selectedId, 10))?.id|| 0;
      this.selectedItemChange.emit(this.selectedItem);
    }
    else{
      //console.log("onChange CB 5");
      this.selectedItem = -1;
      this.selectedItemChange.emit(this.selectedItem);
    }
  }

  /*
  updateSelected(): void {
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
  }*/
 
}