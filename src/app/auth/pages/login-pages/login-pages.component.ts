import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../../shared/interfaces/usuario';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-login-pages',
  templateUrl: './login-pages.component.html',
  styleUrls: ['./login-pages.component.css']
})
export class LoginPagesComponent implements OnInit {
  public loginForm!: FormGroup;
  public verificationForm!: FormGroup;
  public messages: Message[] = [];
  public captchaResolved: boolean = false;
  public showRecaptchaError: boolean = false;
  public showInputErrors: boolean = false;
  public showVerificationStep: boolean = false;
  public isLoading: boolean = false;
  public emailForVerification: string = '';

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required],
      recaptcha: ['', Validators.required]
    });

    this.verificationForm = this.fb.group({
      verificationCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });

    this.showInputErrors = false;
  }

  onSubmit() {
    this.showInputErrors = false;
    
    setTimeout(() => {
      this.showInputErrors = true;
      
      if (this.loginForm.invalid) {
        this.handleFormErrors();
        return;
      }
    }, 10);
    
    if (!this.captchaResolved) {
      this.handleCaptchaError();
      return;
    }
    
    if (this.loginForm.valid && this.captchaResolved) {
      this.showRecaptchaError = false;
      this.showInputErrors = false;
      
      const email = this.loginForm.get('email')!.value;
      const pass = this.loginForm.get('pass')!.value;
      
      this.login(email, pass);
    }
  }

  onVerify() {
    if (this.verificationForm.invalid) {
      this.messages = [
        { severity: 'error', detail: 'Por favor, introduce un código de verificación válido (6 dígitos)' }
      ];
      return;
    }

    const code = this.verificationForm.get('verificationCode')!.value;
    this.verifyCode(code);
  }

  login(email: Usuario['email'], pass: Usuario['pass']) {
    this.isLoading = true;
    this.messages = [];

    this.authService.autenticarUsuario(email, pass).subscribe({
      next: (resp) => {
        this.isLoading = false;
        
        if (resp.status === 'error') {
          this.handleLoginError(resp);
          return;
        }

        if (resp.data?.requiresVerification) {
          // Mostrar paso de verificación
          this.showVerificationStep = true;
          this.emailForVerification = email;
          this.messages = [
            { 
              severity: 'success', 
              detail: 'Hemos enviado un código de verificación a tu correo electrónico. Por favor, introdúcelo a continuación.' 
            }
          ];
        } else {
          // Login exitoso sin verificación
          this.handleSuccessfulLogin(resp);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.messages = [
          { severity: 'error', detail: 'Error en el servidor. Por favor, intenta nuevamente.' }
        ];
        console.error('Error en login:', err);
      }
    });
  }

  verifyCode(code: string) {
    this.isLoading = true;
    this.messages = [];

    this.authService.autenticarSegundoPaso(code).subscribe({
      next: (resp) => {
        this.isLoading = false;
        
        if (resp.status === 'error') {
          this.messages = [
            { severity: 'error', detail: resp.msg || 'Código de verificación incorrecto' }
          ];
          return;
        }

        this.handleSuccessfulLogin(resp);
      },
      error: (err) => {
        this.isLoading = false;
        this.messages = [
          { severity: 'error', detail: err.message || 'Error al verificar el código' }
        ];
        console.error('Error en verify:', err);
      }
    });
  }

  private handleFormErrors() {
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
          firstInvalidControl.classList.remove('input-error');
          setTimeout(() => {
            firstInvalidControl.classList.add('input-error');
          }, 10);
        }
      }, 100);
      
      this.messages = [
        { severity: 'error', detail: 'Por favor, completa todos los campos requeridos' }
      ];
    }
  }

  private handleCaptchaError() {
    this.showRecaptchaError = false;
    setTimeout(() => {
      this.showRecaptchaError = true;
    }, 10);
    
    this.messages = [
      { severity: 'error', detail: 'Por favor, verifica que no eres un robot' }
    ];
    
    setTimeout(() => {
      const recaptchaElement = document.querySelector('.recaptcha-container');
      if (recaptchaElement) {
        recaptchaElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  }

  private handleLoginError(resp: any) {
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

  private handleSuccessfulLogin(resp: any) {
    window.sessionStorage.setItem('rol', resp.data.rol);
    window.sessionStorage.setItem('tkn', resp.data.tkn);
    
    const redirectUrl = sessionStorage.getItem('redirectUrl');
    if (redirectUrl) {
      this.router.navigateByUrl(redirectUrl);
      sessionStorage.removeItem('redirectUrl');
    } else {
      this.router.navigate(['/clientes/inicio']);
    }
  }

  backToLogin() {
    this.showVerificationStep = false;
    this.verificationForm.reset();
    this.messages = [];
  }

  resolved(response: string) {
    this.captchaResolved = !!response;
  }

  onCaptchaExpired() {
    this.captchaResolved = false;
  }
}