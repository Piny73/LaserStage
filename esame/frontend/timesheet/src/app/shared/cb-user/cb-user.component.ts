import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../core/models/user.model';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-cb-user',
  templateUrl: './cb-user.component.html',
  styleUrls: ['./cb-user.component.css']
})
export class CbUserComponent implements OnInit {

  @Input() selectedItem: number | null = null;
  @Output() selectedItemChange: EventEmitter<number> = new EventEmitter<number>();
  
  userList: User[] = [];
  isLoading: boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  // Carica gli utenti dal servizio
  loadUsers(): void {
    this.isLoading = true;
    this.userService.fill().subscribe({
      next: (users: User[]) => {
        this.userList = users;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Errore nel caricamento degli utenti:', error);
        this.isLoading = false;
      }
    });
  }

  // Gestione della selezione utente
  onSelected(event: any): void {
    const selectedValue = event.target.value;

    if (selectedValue) {
      const selectedId = parseInt(selectedValue, 10);
      this.selectedItem = this.userList.find(user => user.id === selectedId)?.id ?? -1;
      this.selectedItemChange.emit(this.selectedItem);
    } else {
      this.selectedItem = -1;
      this.selectedItemChange.emit(this.selectedItem);
    }
  }
}
