import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPagesComponent } from './pages/login-pages/login-pages.component';
import { LayoutAuthComponent } from './pages/layout-auth/layout-auth.component';
import { RegistroPageComponent } from './pages/registro-page/registro-page.component';
import { MsgPageComponent } from './pages/msg-page/msg-page.component';
import { OlvidePassComponent } from './pages/olvide-pass/olvide-pass.component';
import { ConfirmarPageComponent } from './pages/confirmar-page/confirmar-page.component';
import { NuevaPassComponent } from './pages/nueva-pass/nueva-pass.component';
import { publicGuard } from './guards/public.guard';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutAuthComponent,
    children: [
      { path: 'login', component: LoginPagesComponent, canActivate:[publicGuard],  data: { breadcrumb: 'Login' }},
      { path: 'registro', component: RegistroPageComponent, data: { breadcrumb: 'Registro' } },
      { path: 'confirmar', component: ConfirmarPageComponent, data: { breadcrumb: 'Confirmar' } },
      { path: 'confirmar/:tkn', component: ConfirmarPageComponent},
      { path: 'recuperar-cuenta', component: OlvidePassComponent, data: { breadcrumb: 'Restablecer contraseña' } },
      { path: 'nueva-pass', component: NuevaPassComponent, data: { breadcrumb: 'Restlabecer password' } },
      { path: 'nueva-pass/:tkn', component: NuevaPassComponent },
      { path: 'perfil', component:PerfilComponent, data: { breadcrumb: 'Perfil' }},
      { path: 'edit-perfil', component:EditarPerfilComponent, data: { breadcrumb: 'Editar perfil' } },
      { path: 'politicas', component:PrivacyComponent},
      { path: '**', redirectTo: 'login' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
