import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
      email: ['', [Validators.required, Validators.email]], // Validazione dell'email aggiunta
      pwd: ['', Validators.required]
    });
  }
  
  onSubmit() { /*
    if (this.registrazioneForm.valid) {
      const user = this.registrazioneForm.value as User;
      this.userService.create(user).subscribe({
        next: (response) => {
          console.log('Registrazione avvenuta con successo', response);
          this.router.navigate(['/login']); // Reindirizza alla pagina di login dopo la registrazione
        },
        error: (error: any) => {
          console.error('Errore nella registrazione', error);
          this.errorMessage = 'Errore nella creazione dell\'utente. Riprova.';
        }
      });
    } */
  }

  openLogin() {
    this.router.navigate(['/login']); // Reindirizza alla pagina di login
  }
}

