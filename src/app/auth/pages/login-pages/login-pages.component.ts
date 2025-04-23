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
  public captchaResolved: boolean = false;
  public showRecaptchaError: boolean = false;
  public showInputErrors: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required],
      recaptcha: ['', Validators.required]
    });
    
    // Inicialmente no mostrar errores
    this.showInputErrors = false;
  }

  onSubmit() {
    // Primero, desactivar los errores para poder reactivarlos y que se vea la animación
    this.showInputErrors = false;
    
    // Esperar un breve momento y luego mostrar los errores
    setTimeout(() => {
      // Mostrar errores en los campos si el formulario no es válido
      this.showInputErrors = true;
      
      // Verificar si hay campos inválidos
      if (this.loginForm.invalid) {
        // Encontrar el primer campo inválido y hacer scroll hacia él
        const invalidControls: string[] = [];
        
        if (this.loginForm.get('email')?.invalid) {
          invalidControls.push('email');
        }
        
        if (this.loginForm.get('pass')?.invalid) {
          invalidControls.push('pass');
        }
        
        if (invalidControls.length > 0) {
          setTimeout(() => {
            const firstInvalidControl = document.getElementById(invalidControls[0]);
            if (firstInvalidControl) {
              firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
              firstInvalidControl.focus();
              
              // Aplicar y quitar la clase para reiniciar la animación
              firstInvalidControl.classList.remove('input-error');
              setTimeout(() => {
                firstInvalidControl.classList.add('input-error');
              }, 10);
            }
          }, 100);
          
          this.messages = [
            { severity: 'error', detail: 'Por favor, completa todos los campos requeridos' }
          ];
          
          return;
        }
      }
    }, 10);
    
    // Verificar si el reCAPTCHA está resuelto
    if (!this.captchaResolved) {
      // Reiniciar la animación quitando y volviendo a aplicar la clase
      this.showRecaptchaError = false;
      setTimeout(() => {
        this.showRecaptchaError = true;
      }, 10);
      
      this.messages = [
        { severity: 'error', detail: 'Por favor, verifica que no eres un robot' }
      ];
      
      // Hacer scroll al contenedor del reCAPTCHA para asegurar que sea visible
      setTimeout(() => {
        const recaptchaElement = document.querySelector('.recaptcha-container');
        if (recaptchaElement) {
          recaptchaElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      
      return;
    }
    
    if (this.loginForm.valid && this.captchaResolved) {
      // Ocultar mensajes de error
      this.showRecaptchaError = false;
      this.showInputErrors = false;
      
      const email = this.loginForm.get('email')!.value;
      const pass = this.loginForm.get('pass')!.value;
      // Aquí puedes enviar los datos del formulario, por ejemplo, a un servicio
      this.log(email, pass);
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
          // Verificar si el mensaje es que el usuario no existe
          if (resp.msg && resp.msg.includes('no existe')) {
            this.messages = [
              { severity: 'error', detail: 'Este usuario no ha sido registrado' },
            ];
          } else {
            this.messages = [
              { severity: 'error', detail: resp.msg },
            ];
          }
        }
        console.log(resp);
        
      });



  }

  /**
   * Mu00e9todo que se ejecuta cuando el captcha es resuelto
   * @param response Respuesta del captcha
   */
  resolved(response: string) {
    this.captchaResolved = !!response;
  }

  /**
   * Mu00e9todo que se ejecuta cuando el captcha expira
   */
  onCaptchaExpired() {
    this.captchaResolved = false;
  }
}
