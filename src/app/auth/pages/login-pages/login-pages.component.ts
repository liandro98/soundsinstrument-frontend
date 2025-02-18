import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../../shared/interfaces/usuario';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-login-pages',
  templateUrl: './login-pages.component.html',
  styleUrl: './login-pages.component.css'
})
export class LoginPagesComponent implements OnInit {

  public loginForm!: FormGroup;
  public messages: Message[] = [];

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required]
    });

    
  }

  onSubmit() {
    if (this.loginForm.valid) {
      //console.log('Formulario válido:', this.loginForm.value);
      const email = this.loginForm.get('email')!.value;
      const pass = this.loginForm.get('pass')!.value;
      // Aquí puedes enviar los datos del formulario, por ejemplo, a un servicio
      this.log(email, pass);
    } else {
      console.log('Formulario no válido');
    }
  }

  log(email: Usuario['email'], pass: Usuario['pass']) {
    this.authService.autenticarUsusrio(email, pass).
      subscribe(resp => {
        if (resp.status != 'error') {
          window.sessionStorage.setItem('rol', resp.data.rol);
          window.sessionStorage.setItem('tkn', resp.data.tkn);
          // Verifica si hay una URL de redirección almacenada
          const redirectUrl = sessionStorage.getItem('redirectUrl');
          console.log(redirectUrl); 
          if (redirectUrl) {
            this.router.navigateByUrl(redirectUrl); // Redirige a la URL original
            sessionStorage.removeItem('redirectUrl'); // Limpia el valor de `redirectUrl`
          } else {
            this.router.navigate(['/clientes/inicio']); // O redirige a la página principal u otra por defecto
          }
        } else {
          this.messages = [
            { severity: 'error', detail:resp.msg },
          ];
        }
        console.log(resp);
        
      });



  }
}
