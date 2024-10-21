import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-cb-user',
  templateUrl: './cb-user.component.html',
  styleUrl: './cb-user.component.css'
})
export class CbUserComponent implements OnInit {

  @Input("selectedUser") selectedItem : number | null = null;
  @Output("selectedItemChange") selectedItemChange: EventEmitter<number> = new EventEmitter<number>();         
  userList: User[] = [];   

  constructor(private userService: UserService) {}

  ngOnInit(): void {
      this.userList = this.userService.getUserList();
  }

  onSelected(event: any) {
    if (event.target.value) {
      const selectedId = event.target.value;
      this.selectedItem = this.userList.find(us => us.id === parseInt(selectedId, 10))?.id|| 0;
      this.selectedItemChange.emit(this.selectedItem);
    }
    else{
      this.selectedItem = -1;
      this.selectedItemChange.emit(this.selectedItem);
    }
  } 
}