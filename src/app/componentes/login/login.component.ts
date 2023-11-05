import { LoginService } from './../../servicios/auth/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginRequest } from 'src/app/servicios/auth/loginRequest';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private loginService: LoginService, private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.username, this.password).subscribe((response) => {
      if (response.success) {
        this.router.navigate([this.authService.getRedirectUrl()]);
      } else {
        // Manejar errores de inicio de sesión
        console.log('Error de inicio de sesión');
      }
    });
    
  }

}
