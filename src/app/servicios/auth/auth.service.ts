import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service'; // Importa tu servicio de API si lo tienes
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userRole: number | null = null;

  constructor(private router: Router, private apiService: ApiService) {}

  login(username: string, password: string): Observable<any> {
    // Realiza una solicitud al backend para autenticar al usuario y obtener su rol.
    // Asumiendo que tienes una API de autenticación en tu backend.
    const credentials = { username, password };
    
    // Llama al método `login` de `apiService` para realizar la solicitud al backend
    return new Observable((observer) => {
      this.apiService.login(username, password).subscribe(
        (response: any) => {
          if (response.success) {
            this.userRole = response.role; // Almacena el rol del usuario
            this.router.navigate([this.getRedirectUrl()]);
          } else {
            // Manejar errores de inicio de sesión
            console.log('Error de inicio de sesión');
          }
          observer.next(response);
          observer.complete();
        },
        (error) => {
          console.error('Error en la solicitud de inicio de sesión', error);
          observer.error(error);
          observer.complete();
        }
      );
    });
  }


  isUserLoggedIn(): boolean {
    // Comprueba si el usuario ha iniciado sesión
    return this.userRole !== null;
  }

  hasPermission(requiredRole: number): boolean {
    // Comprueba si el usuario tiene el rol necesario para acceder a una ruta
    return this.userRole === requiredRole;
  }

  getRedirectUrl() {
    if (this.userRole === 1) {
      return '/almacen';
    } else if (this.userRole === 2) {
      return '/almacen';
    } else {
      return '/login'; // Redirigir al inicio de sesión en caso de error o rol desconocido
    }
  }

  logout() {
    // Cerrar la sesión del usuario y redirigir al inicio de sesión
    this.userRole = null;
    this.router.navigate(['/login']);
  }
}
