
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Login } from '../../core/models/login.model';
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
  @Output() onLogin = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      usr: ['', Validators.required],
      pwd: ['', Validators.required]
    });

    if (this.authService.isTokenValid()) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const login: Login = this.loginForm.value;
      this.authService.login(login).subscribe({
        next: (response) => {
          console.log('Login ben riuscito:', response);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Errore nel login:', error);
          this.errorMessage = 'Errore di login. Verifica le tue credenziali.';
        }
      });
    }
  }
}

/*import { Component } from '@angular/core';

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
}
*/