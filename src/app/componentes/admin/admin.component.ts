import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService, User } from '../../api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  userForm: FormGroup;
  users: User[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('gestion'), // Contraseña por defecto
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      role: new FormControl('2', [Validators.required]) // Rol por defecto (2: Personal de Almacén)
    });
  
    this.loadUsers();
  }

  loadUsers() {
    // Lógica para cargar los usuarios desde tu servicio API
    this.apiService.loadUsers().subscribe((users: User[]) => {
      this.users = users;
      console.log(users);
    });
  }

  addUser() {
    if (this.userForm.valid) {
      this.apiService.addUser(this.userForm.value).subscribe(
        (response) => {
          if (response.success) {
            // Usuario agregado con éxito, puedes agregar una lógica adicional aquí
            console.log('Usuario agregado con éxito.');
          } else {
            // Manejar errores de inserción de usuario
            console.error('Error al agregar usuario.');
          }
        },
        (error) => {
          // Manejar errores de la solicitud
          console.error('Error en la solicitud: ', error);
        }
      );
    }
  }

  deleteUser(username: string) {
    // Elimina un usuario por su nombre de usuario (username) usando tu servicio API
    this.apiService.deleteUser(username).subscribe((response) => {
      if (response.success) {
        // Si la operación de eliminación fue exitosa, vuelve a cargar la lista de usuarios
        this.loadUsers();
      } else {
        // Si hay un error al eliminar el usuario, puedes manejarlo aquí
      }
    });
  }

  roleNames = {
    2: 'Personal de Almacén',
    3: 'Doctor',
    4: 'Enfermera'
  };

  getRolText(roleNumber: number): string {
    if (this.roleNames.hasOwnProperty(roleNumber)) {
      return this.roleNames[roleNumber];
    } else {
      return 'Rol Desconocido';
    }
  }

  resetPassword(username: string) {
    // Ejemplo de implementación:
    this.apiService.resetPassword(username).subscribe((response) => {
      if (response.success) {
        // Contraseña restablecida con éxito.
        console.log('Contraseña restablecida con éxito.');
      } else {
        // Maneja cualquier error o respuesta de la API si el restablecimiento falla.
        console.error('Error al restablecer la contraseña.');
      }
    });
  }
  
  
  
}
