import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { Login } from '../../core/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  isLogin: boolean = true; // Stato di login
  loginForm!: FormGroup; // Gruppo di controlli del modulo di login
  errorMessage: string = ''; // Messaggio di errore
  @Output() onLogin = new EventEmitter<boolean>(); // Evento di login

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usr: ['', Validators.required], // Campo per l'username
      pwd: ['', Validators.required] // Campo per la password
    });

    if (this.authService.getUser()) {
      this.router.navigate(['/home']); // Naviga alla home se l'utente è già autenticato
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      //const { username, password } = this.loginForm.value;
      const login: Login = this.loginForm.value as Login; // Ottieni i dati del login
      //console.log('Dati', login);
      this.authService.login(login).subscribe({
        next: (response) => {
          console.log('Login riuscito', response); // Messaggio di login riuscito
          this.router.navigate(['/home']); // Naviga alla home
        },
        error: (error) => {
          console.error('Errore nel login', error); // Messaggio di errore
          this.errorMessage = 'Login fallito. Controlla le tue credenziali.'; // Messaggio di errore per l'utente
          this.router.navigate(['/home']); // Naviga alla home
        }
      });
    }
  }

  openRegistrazione() {
    this.router.navigate(['/registrazione']); // Naviga alla pagina di registrazione
  }
}


