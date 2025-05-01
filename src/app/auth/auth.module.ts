import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPagesComponent } from './pages/login-pages/login-pages.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroPageComponent } from './pages/registro-page/registro-page.component';
// Importar Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { LayoutAuthComponent } from './pages/layout-auth/layout-auth.component';
import { MsgPageComponent } from './pages/msg-page/msg-page.component';
import { ConfirmarPageComponent } from './pages/confirmar-page/confirmar-page.component';
import { OlvidePassComponent } from './pages/olvide-pass/olvide-pass.component';
import { AlertaComponent } from './components/alerta/alerta.component';
// Importar reCAPTCHA
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { NuevaPassComponent } from './pages/nueva-pass/nueva-pass.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil.component';

@NgModule({
  declarations: [
    LoginPagesComponent,
    RegistroPageComponent,
    LayoutAuthComponent,
    MsgPageComponent,
    ConfirmarPageComponent,
    OlvidePassComponent,
    AlertaComponent,
    NuevaPassComponent,
    PerfilComponent,
    EditarPerfilComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    // Módulos de Angular Material
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatStepperModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogModule,
    // Módulos de reCAPTCHA
    RecaptchaModule,
    RecaptchaFormsModule
  ]
})
export class AuthModule { }
