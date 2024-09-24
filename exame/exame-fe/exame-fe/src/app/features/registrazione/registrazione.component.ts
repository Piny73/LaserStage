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
      email: ['', [Validators.required, Validators.email]], // Validação de e-mail adicionada
      pwd: ['', Validators.required]
    });
  }
  
  onSubmit() {
    if (this.registrazioneForm.valid) {
      const user = this.registrazioneForm.value as User;
      this.userService.create(user).subscribe({
        next: (response) => {
          console.log('Registrazione bem-sucedida', response);
          this.router.navigate(['/login']); // Redirecionar para a página de login após o registro
        },
        error: (error) => {
          console.error('Error Registrazione', error);
          this.errorMessage = 'Erro ao criar usuário. Tente novamente.';
        }
      });
    }
  }

  openLogin() {
    this.router.navigate(['/login']); // Redirecionar para a página de login
  }
}
