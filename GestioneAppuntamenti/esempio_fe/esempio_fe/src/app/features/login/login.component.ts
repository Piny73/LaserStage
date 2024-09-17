import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';




// Definizione dell'interfaccia Login
export interface Login {
  usr: string;
  pwd: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  icon = faSignInAlt;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      usr: ['', Validators.required],
      pwd: ['', Validators.required]
    });

    if (authService.isTokenValid()) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { usr, pwd } = this.loginForm.value; // Utilizzo della destrutturazione
      const login: Login = { usr, pwd }; // Creazione dell'oggetto Login

      this.authService.login(login).subscribe({
        next: (response) => {
          console.log('Login riuscito', response);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Errore nel login', error);
          this.errorMessage = ' Non navigare qui.Verifica le credenziali.';

        }
      });
    }
  }
}

