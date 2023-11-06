import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
    id: number;
    username: string;
    password: string;
    nombre: string;
    apellidos: string;
    role: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8080'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  // Método para realizar una solicitud GET a una API en el backend.
  public get(endpoint: string): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.get(url);
  }

  // Método para realizar una solicitud POST a una API en el backend.
  public post(endpoint: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, data, { headers });
  }

  login(username: string, password: string): Observable<any> {
    const credentials = { username, password };

    const url = `${this.apiUrl}/api/login.php`; // Reemplaza con la ruta de tu API de inicio de sesión
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, credentials, { headers });
  }

  loadUsers(): Observable<User[]> {
    const url = `${this.apiUrl}/api/loadUsers.php`; // Reemplaza con la ruta de tu API para cargar usuarios
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<User[]>(url, { headers });
  }

  addUser(user: User): Observable<any> {
    const url = `${this.apiUrl}/api/addUser.php`; // Reemplaza con la ruta de tu API para agregar usuarios
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, user, { headers });
  }

  deleteUser(username: string): Observable<any> {
    const url = `${this.apiUrl}/api/deleteUser.php`; // Reemplaza con la ruta de tu API para eliminar usuarios
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Si necesitas enviar algún parámetro en la solicitud, modifica el cuerpo de la solicitud aquí
    const body = { username };

    return this.http.post(url, body, { headers });
  }

}
