import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Message } from 'primeng/api';
import { Usuario } from '../../../shared/interfaces/usuario';



@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrl: '../login-pages/login-pages.component.css'
})
export class EditarPerfilComponent {
  perfilForm: FormGroup;
  public messages: Message[] = [];
  public id:Usuario['_id'] = '';


  constructor(private fb: FormBuilder, private authService:AuthService) {
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
      this.authService.editarPerfil(this.id,this.perfilForm.value).subscribe({
        next: (response) => {
          //console.log(response.data);
          this.messages = [
            { severity: 'success', detail:response.msg },
          ];
        },

        error: (err) => {
          console.error(err)
          this.messages = [
            { severity: 'error', detail:err.msg },
          ];
        }
      
      });
    }
  }
}
