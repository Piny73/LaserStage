import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../core/models/user.model';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-cb-user',
  templateUrl: './cb-user.component.html',
  styleUrls: ['./cb-user.component.css']  // Corretto styleUrls
})
export class CbUserComponent implements OnInit {

  @Input("selectedUser") selectedItem: number | null = null;
  @Output("selectedItemChange") selectedItemChange: EventEmitter<number> = new EventEmitter<number>();         
  userList: User[] = [];   

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userList = this.userService.getUserList();
  }

  onSelected(event: Event): void {
    const target = event.target as HTMLSelectElement;  // Cast per garantire che l'evento provenga da un elemento select
    if (target && target.value) {
      const selectedId = target.value;
      this.selectedItem = this.userList.find(us => us.id === parseInt(selectedId, 10))?.id || 0;
      this.selectedItemChange.emit(this.selectedItem);
    } else {
      this.selectedItem = -1;
      this.selectedItemChange.emit(this.selectedItem);
    }
  }
}

