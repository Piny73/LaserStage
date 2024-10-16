import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { catchError, of } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  islogin: boolean = true;
  loginForm!: FormGroup;
  errorMessage: string = '';
  icon = faSignInAlt;
  @Output() close = new EventEmitter<void>(); // Evento per chiudere il form
  isLoading: boolean = false; // Stato di caricamento

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    this.isLoading = true; // Avvia il caricamento

    this.authService.login(email, password).pipe(
      catchError(error => {
        this.errorMessage = 'Errore di login. Verifica le tue credenziali.';
        this.isLoading = false; // Ferma il caricamento
        return of(null); // Restituisce un Observable vuoto
      })
    ).subscribe({
      next: (response) => {
        if (response) {
          this.router.navigate(['/home']);
          this.onClose(); // Chiudi il modale se il login ha successo
        }
        this.isLoading = false; // Ferma il caricamento
      }
    });
  }

  onClose(): void {
    this.close.emit(); // Emetti l'evento di chiusura
  }
}









/*
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  icon = faSignInAlt;
  @Output() close = new EventEmitter<void>(); // Evento per chiudere il form

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const login = this.loginForm.value;
      this.authService.login(login).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: () => {
          this.errorMessage = 'Errore di login. Verifica le tue credenziali.';
        }
      });
    }
  }
}
*/

/*

import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:string='';
  pwd:string=''

  constructor(){}

  onLogin(){
    console.log('Email:', this.email);
    console.log('Password:', this.pwd);
    }
  }

*/








/*
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  icon = faSignInAlt;
  @Output() close = new EventEmitter<void>(); // Evento per chiudere il form

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const login = this.loginForm.value;
      this.authService.login(login).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: () => {
          this.errorMessage = 'Errore di login. Verifica le tue credenziali.';
        }
      });
    }
  }
}
*/

/*

import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:string='';
  pwd:string=''

  constructor(){}

  onLogin(){
    console.log('Email:', this.email);
    console.log('Password:', this.pwd);
    }
  }

*/