import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../core/models/login.model';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'; // Importando o ícone de lápis
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //private router: Router = new Router;
  loginForm: FormGroup;
  errorMessage: string = '';
  private encryptionKey: string = 'clarinha';
  icon = faSignInAlt;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
        
    this.loginForm = this.fb.group({
      usr: ['', Validators.required],
      pwd: ['', Validators.required]
    });

    if(authService.isTokenValid()){
      this.router.navigate(['/home']);
    }

  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      //const { username, password } = this.loginForm.value;
      const login: Login = this.loginForm.value as Login; 
      //console.log('Dati', login);
      this.authService.login(login).subscribe({
        next: (response) => {
          console.log('Login bem-sucedido', response);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Erro no login', error);
          this.errorMessage = 'Falha no login. Verifique suas credenciais.';
          this.router.navigate(['/home']);
        }
      });
    }
  }

  

  
}

