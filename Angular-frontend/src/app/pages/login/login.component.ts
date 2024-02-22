import { AuthService } from './../../services/auth.service';
import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReqLogin } from '../../models/dto/login.dto';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public loginModel: ReqLogin = {
    username: '',
    password: '',
  };
  constructor(
    public authService: AuthService,
    private router: Router,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  get cpf() {
    return this.loginForm.controls;
  }

  login() {
    if (this.loginForm.valid) {
      // Perform login action
      this.loginModel.username = this.loginForm.get('username')?.value;
      this.loginModel.password = this.loginForm.get('password')?.value;
      this.authService.login(this.loginModel).subscribe((res) => {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('userId', res.userId);
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
