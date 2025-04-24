import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../../shared/interfaces/usuario';
import { AuthService } from '../../services/auth.service';

interface Msg {
  title: string;
  msg: string;
}

// Validador personalizado mejorado para la contraseña
function createPasswordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const isLengthValid = value.length >= 8;

    const errors: ValidationErrors = {};
    if (!isLengthValid) errors['minlength'] = { requiredLength: 8, actualLength: value.length };
    if (!hasUpperCase) errors['missingUpperCase'] = true;
    if (!hasLowerCase) errors['missingLowerCase'] = true;
    if (!hasNumeric) errors['missingNumber'] = true;
    if (!hasSpecialChar) errors['missingSpecialChar'] = true;

    return Object.keys(errors).length > 0 ? errors : null;
  };
}

// Validador para números de teléfono
function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const isValid = /^[0-9]{10,11}$/.test(value);
    return isValid ? null : { invalidPhone: true };
  };
}

@Component({
  selector: 'app-registro-page',
  templateUrl: './registro-page.component.html',
  styleUrls: ['./registro-page.component.css']
})
export class RegistroPageComponent implements OnInit {
  personalFormGroup!: FormGroup;
  securityFormGroup!: FormGroup;
  additionalFormGroup!: FormGroup;
  public msg: Msg = { title: '', msg: '' };
  public isSubmitting = false;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.personalFormGroup = this._formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.securityFormGroup = this._formBuilder.group({
      pass: ['', [Validators.required, createPasswordStrengthValidator()]],
    });

    this.additionalFormGroup = this._formBuilder.group({
      phone: ['', [Validators.required, phoneNumberValidator()]],
      direccion: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit(): void {
    if (this.isSubmitting) return;
    
    if (this.personalFormGroup.invalid || 
        this.securityFormGroup.invalid || 
        this.additionalFormGroup.invalid) {
      this.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    
    const formData: Usuario = {
      ...this.personalFormGroup.value,
      ...this.securityFormGroup.value,
      ...this.additionalFormGroup.value,
    };

    this.register(formData);
  }

  private markAllAsTouched(): void {
    this.personalFormGroup.markAllAsTouched();
    this.securityFormGroup.markAllAsTouched();
    this.additionalFormGroup.markAllAsTouched();
  }

  register(user: Usuario) {
    this.authService.registroUs(user).subscribe({
      next: (resp) => {
        console.log(resp);
        this.router.navigate(['/auth/confirmar']);
      },
      error: (err) => {
        console.error(err);
        this.isSubmitting = false;
        this.msg = {
          title: 'Error en el registro',
          msg: err.error?.message || 'Ocurrió un error al registrar el usuario'
        };
      }
    });
  }
}