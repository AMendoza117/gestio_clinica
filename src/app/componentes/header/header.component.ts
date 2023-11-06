// header.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false; // Inicialmente, el usuario no está 
  componentName: string;

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.subscribe((val) => {
      this.componentName = this.getCurrentComponentName();
    });
  }

  ngOnInit() {
    // Verificar si el usuario está logeado al cargar el componente
    this.isLoggedIn = this.authService.isUserLoggedIn();
  }

  logout() {
    // Llamar al método de cierre de sesión en el servicio de autenticación
    this.authService.logout();
    this.isLoggedIn = false; // Actualizar el estado de inicio de sesión
  }

  getCurrentComponentName(): string {
    // Obtén el nombre del componente actual desde la ruta activa
    const currentRoute = this.router.url;
    if (currentRoute.includes('/login')) {
      return 'login';
    }
    if (currentRoute.includes('/almacen')) {
      return 'almacen';
    }
    return ''; // Devuelve un valor predeterminado o maneja otros casos según sea necesario
  }
  
}

