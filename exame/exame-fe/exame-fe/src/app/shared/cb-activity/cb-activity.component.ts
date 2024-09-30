import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ActivityService } from '../../core/services/activity.service';
import { Activity } from '../../core/models/activity.model';

@Component({
  selector: 'app-cb-activity',
  templateUrl: './cb-activity.component.html',
  styleUrl: './cb-activity.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CbActivityComponent implements OnInit {


  @Input("selectedArea") selectedItem : number | null = null;
  @Output("selectedItemChange") selectedItemChange: EventEmitter<number> = new EventEmitter<number>();         
  activityList: Activity[] = [];   

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
      this.activityList = this.activityService.getActivityList();
  }

  onSelected(event: any) {
    if (event.target.value) {
      const selectedId = event.target.value;
      this.selectedItem = this.activityList.find(ac => ac.id === parseInt(selectedId, 10))?.id|| 0;
      this.selectedItemChange.emit(this.selectedItem);
    }
    else{
      //console.log("onChange CB 5");
      this.selectedItem = -1;
      this.selectedItemChange.emit(this.selectedItem);
    }
  } 
}