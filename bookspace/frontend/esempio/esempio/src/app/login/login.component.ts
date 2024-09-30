import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  

  email: string = '';
  password: string = '';

  constructor() { }

  onLogin() {

    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }

}