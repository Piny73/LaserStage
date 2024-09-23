import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User, UserRoles } from '../../core/models/user.model';
import { UserService } from '../../core/services/user.sevice';

@Component({
  selector: 'app-gestione-utente',
  templateUrl: './gestione-utente.component.html',
  styleUrls: ['./gestione-utente.component.css']
})
export class GestioneUtenteComponent implements OnInit {
  userForm: FormGroup;
  roles = UserRoles;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(6)]],
      roleuser: [this.roles.USER]
    });
  }

  ngOnInit(): void {}
  
  onSubmit(): void {
    console.log('Stato del modulo:', this.userForm); // Aggiungi qui
  
    if (this.userForm.valid) {
      const newUser: User = this.userForm.value;
  
      this.userService.registerUser(newUser).subscribe({
        next: (response) => {
          console.log('Utente registrato con successo:', response);
          // Qui puoi aggiungere un messaggio di successo o reindirizzare l'utente
        },
        error: (error) => {
          console.error('Errore durante la registrazione:', error);
          // Gestisci l'errore, ad esempio mostrando un messaggio all'utente
        }
      });
    } else {
      console.error('Il form non è valido', this.userForm.errors);
    }
  }
}


