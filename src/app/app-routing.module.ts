import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { SearchResultsComponent } from './shared/components/search-results/search-results.component';
import { authGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule),
    data: {  }
  },
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesModule ),
    data: {  }
  },
  {
    path: 'ventas',
    loadChildren: () => import('./ventas/ventas.module').then( m => m.VentasModule ),
    canActivate:[authGuard],
    data: {expectedRole:['Cliente','ADMTlN'], breadcrumb: 'Ventas'}
  },
  {
    path: 'administracion',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate:[authGuard],
    data: {expectedRole:'ADMTlN'},
  },
  {
    path: 'nosotros',
    loadChildren: () => import('./nosotros/nosotros.module').then( m => m.NosotrosModule ),
    data: { }
  },
  {
    path: 'busqueda',
    component: SearchResultsComponent,
    data: { breadcrumb: 'Resultados de búsqueda' }
  },
  {
    path: '404',
    component:Error404PageComponent
  },
  {
    path: '',
    redirectTo: 'clientes',
    pathMatch: 'full'
  },
  {
    path:'**',
    redirectTo:'404'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
