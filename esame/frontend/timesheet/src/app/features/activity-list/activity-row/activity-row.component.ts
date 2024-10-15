import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Activity } from '../../../core/models/activity.model';
import { User } from '../../../core/models/user.model';
import { ActivityService } from '../../../core/services/activity.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'tr[app-activity-row]',
  templateUrl: './activity-row.component.html',
  styleUrls: ['./activity-row.component.css']
})
export class ActivityRowComponent implements OnInit {

  @Input('activity-data') activity!: Activity;
  @Input('activity-selected') activitySelected!: Activity;
  @Output('onSelectActivity') onSelectActivity = new EventEmitter<Activity>();

  _selected: boolean = false;
  _copyActivitySelected!: Activity;
  showDialog: boolean = false;

  constructor(private activityService: ActivityService, private userService: UserService) {}

  ngOnInit(): void {
    if (this.activity && this.activity.ownerid) {
      const owner = this.userService.findById(this.activity.ownerid);
      if (owner) {
        this.activity.owner = owner as User;
      } else {
        console.warn(`User with id ${this.activity.ownerid} not found.`);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activity'] && this.activity) {
      this.initializeSelection();
    }
  }

  initializeSelection() {
    if (this.activitySelected) {
      // Creazione di una copia dell'attività selezionata
      this._copyActivitySelected = Object.assign({}, this.activitySelected);
      
      // Assicurati di usare il metodo corretto
      this._copyActivitySelected.getShortDescription = this.activitySelected.getShortDescription.bind(this.activitySelected);
      this._copyActivitySelected.isOngoing = this.activitySelected.isOngoing.bind(this.activitySelected);
      
      this._selected = this.activity.id === this.activitySelected.id;
    }
  }

  openChangeDialog(event: Event) {
    event.preventDefault();
    if (this.activity) {
      this._selected = true;
      this.onSelectActivity.emit(this.activity);
    } else {
      console.warn('Activity is not defined.');
    }
  }
}




