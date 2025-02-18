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

const routes: Routes = [
  {
    path: '',
    component: LayoutAuthComponent,
    children: [
      { path: 'login', component: LoginPagesComponent, canActivate:[publicGuard] },
      { path: 'registro', component: RegistroPageComponent },
      { path: 'confirmar', component: ConfirmarPageComponent },
      { path: 'confirmar/:tkn', component: ConfirmarPageComponent },
      { path: 'recuperar-cuenta', component: OlvidePassComponent },
      { path: 'nueva-pass', component: NuevaPassComponent },
      { path: 'nueva-pass/:tkn', component: NuevaPassComponent },
      { path: 'perfil', component:PerfilComponent},
      { path: 'edit-perfil', component:EditarPerfilComponent },
      { path: '**', redirectTo: 'login' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
