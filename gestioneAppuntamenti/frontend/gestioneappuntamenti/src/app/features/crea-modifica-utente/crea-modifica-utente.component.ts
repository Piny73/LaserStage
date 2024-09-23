import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crea-modifica-utente',
  templateUrl: './crea-modifica-utente.component.html',
  styleUrls: ['./crea-modifica-utente.component.css']
})
export class CreaModificaUtenteComponent implements OnInit {
  userForm: FormGroup;
  isEditing: boolean = false; // Per gestire la modifica

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      dataNascita: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      attivo: [true] // Di default l'account è attivo
    });
  }

  ngOnInit(): void {
    // Se stai modificando un utente, carica i dati qui
    // this.loadUserData(userId); // Esempio di metodo per caricare i dati
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      if (this.isEditing) {
        // Logica per aggiornare l'utente
        console.log("Modifica utente:", this.userForm.value);
      } else {
        // Logica per creare un nuovo utente
        console.log("Crea utente:", this.userForm.value);
      }
    }
  }

  onDelete(): void {
    // Logica per eliminare l'utente
    console.log("Elimina utente");
  }

  // Metodo per caricare i dati dell'utente da modificare
  loadUserData(userId: string): void {
    // Qui recuperi i dati dell'utente e popoli il form
  }
}

