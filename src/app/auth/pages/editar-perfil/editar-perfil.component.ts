import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Message } from 'primeng/api';
import { Usuario } from '../../../shared/interfaces/usuario';


@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrl: '../login-pages/login-pages.component.css'
})
export class EditarPerfilComponent implements OnInit {
  perfilForm: FormGroup;
  public messages: Message[] = [];
  public id:Usuario['_id'] = '';
  public modoEdicion: boolean = true; // Variable para controlar si los campos están en modo edición


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.perfilForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerPerfil();
  }

  obtenerPerfil(): void {
    this.authService.obtenerPerfil().subscribe({
      next: (data) => {
        console.log(data);
        this.perfilForm.patchValue(data.data);
        this.id = data.data._id;

      },
      error: (err) => console.error(err)
    });
  }

  onSubmit(): void {
    if (this.perfilForm.valid) {
      this.authService.editarPerfil(this.id, this.perfilForm.value).subscribe({
        next: (response) => {
          this.messages = [
            { severity: 'success', detail: response.msg },
          ];
          
          // Navegar a la página de perfil después de guardar exitosamente
          setTimeout(() => {
            this.router.navigate(['/auth/perfil']);
          }, 1000); // Pequeño retraso para que el usuario vea el mensaje de éxito
        },
        error: (err) => {
          console.error(err);
          this.messages = [
            { severity: 'error', detail: err.error?.msg || 'Error al actualizar el perfil' },
          ];
        }
      });
    }
  }
  
  // Método para volver a activar la edición
  habilitarEdicion(): void {
    this.modoEdicion = true;
    Object.keys(this.perfilForm.controls).forEach(key => {
      this.perfilForm.get(key)?.enable();
    });
  }
}
