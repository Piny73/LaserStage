import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../core/models/login.model';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  islogin:boolean = true;
  loginForm!: FormGroup;
  errorMessage: string = '';
  @Output() onLogin = new EventEmitter<boolean>();

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {   
  }
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usr: ['', Validators.required],
      pwd: ['', Validators.required]
    });
  
    if(this.authService.getUser()){
      this.router.navigate(['/home']);
    }
   
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

  openRegistrazione(){
    this.router.navigate(['/registrazione']);
  }
  

  
}

