// src/app/auth/login/login.component.ts
/*import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log('Login:', username, password);
      // Adicione a lógica de autenticação aqui
    } else {
      console.log('Formulário inválido');
    }
  }
}

import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido', response);
        // Redirecionar o usuário para a página inicial ou outra página após login bem-sucedido
      },
      error: (error) => {
        console.error('Erro no login', error);
        this.errorMessage = 'Falha no login. Verifique suas credenciais.';
      }
    });
  }
}
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: (response) => {
          console.log('Login bem-sucedido', response);
          // Redirecionar ou realizar ação pós-login
        },
        error: (error) => {
          console.error('Erro no login', error);
          this.errorMessage = 'Falha no login. Verifique suas credenciais.';
        }
      });
    }
  }
}

