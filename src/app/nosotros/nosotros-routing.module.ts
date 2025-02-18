import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NosotrosPageComponent } from './nosotros-page/nosotros-page.component';

const routes: Routes = [
  {
      path: 'nosotros',
      component: NosotrosPageComponent
  },
  {
    path: '**',
    redirectTo:'nosotros'
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NosotrosRoutingModule { }
