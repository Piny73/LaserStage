import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../core/models/user.model';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})

export class RegistrazioneComponent implements OnInit {

  registrazioneForm!: FormGroup;
  errorMessage: string = '';

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) {   
  }
  
  ngOnInit(): void {
    this.registrazioneForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], 
      pwd: ['', [Validators.required, Validators.minLength(4)]]
    });
  }
  
  onSubmit() { 
    if (this.registrazioneForm.valid) {
      const user = this.registrazioneForm.value as User;
  
      // Verifica che la password sia lunga almeno 4 caratteri prima di inviare la richiesta
      if (user.pwd.length < 4) {
        this.errorMessage = 'La password deve essere lunga almeno 4 caratteri.';
        return; // Ferma l'esecuzione se la password non soddisfa i requisiti
      }
  
      this.userService.create(user).subscribe({
        next: (response) => {
          console.log('Registrazione effettuata con successo', response);
          this.router.navigate(['/login']); // Naviga alla pagina di login dopo la registrazione
        },
        error: (error: any) => {
          console.error('Error Registrazione', error);
  
          // Gestione degli errori basata sullo status code restituito dal server
          if (error.status === 412) {
            // Codice 412 indica che c'è un problema con la richiesta (es. email già esistente o password troppo corta)
            this.errorMessage = 'Registrazione fallita: Email già registrata o password troppo corta.';
          } else if (error.status === 400) {
            // Codice 400 indica che c'è un errore nella validazione
            this.errorMessage = 'Dati non validi. Controlla le informazioni inserite.';
          } else if (error.status === 500) {
            // Codice 500 indica un errore interno del server
            this.errorMessage = 'Errore del server. Riprova più tardi.';
          } else {
            // Messaggio di errore generico per altri tipi di errori
            this.errorMessage = 'Errore nella registrazione. Riprova!';
          }
        }
      });
    } else {
      // Se il form non è valido, mostra un messaggio di errore generico
      this.errorMessage = 'Per favore, compila tutti i campi richiesti.';
    }
  }
  
  openLogin() {
    this.router.navigate(['/login']); 
  }
}
