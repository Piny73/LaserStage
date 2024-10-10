import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivityService } from '../../core/services/activity.service';
import { Activity } from '../../core/models/activity.model';
import { UserService } from '../../core/services/user.service'; // Importa il servizio UserService
import { User } from '../../core/models/user.model'; // Importa il modello User

@Component({
  selector: 'app-cb-activity',
  templateUrl: './cb-activity.component.html',
  styleUrls: ['./cb-activity.component.css'], // Correggi 'styleUrl' in 'styleUrls'
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CbActivityComponent implements OnInit {

  @Input("selectedArea") selectedItem: number | null = null;
  @Output("selectedItemChange") selectedItemChange: EventEmitter<number> = new EventEmitter<number>();         
  activityList: Activity[] = [];   
  userList: User[] = []; // Aggiungi la proprietà userList per gli utenti

  constructor(
    private activityService: ActivityService,
    private userService: UserService // Inietta il servizio UserService
  ) {}

  ngOnInit(): void {
    // Ottieni l'elenco delle attività
    this.activityList = this.activityService.getActivityList();

    // Ottieni la lista degli utenti dal servizio UserService
    this.userService.fill().subscribe(
      (data: User[]) => {
        this.userList = data; // Assegna i dati ricevuti alla proprietà userList
      },
      (error) => {
        console.error('Errore durante il caricamento degli utenti:', error);
      }
    );
  }

  onSelected(event: any) {
    if (event.target.value) {
      const selectedId = event.target.value;
      this.selectedItem = this.activityList.find(ac => ac.id === parseInt(selectedId, 10))?.id || 0;
      this.selectedItemChange.emit(this.selectedItem);
    } else {
      this.selectedItem = -1;
      this.selectedItemChange.emit(this.selectedItem);
    }
  }
}
