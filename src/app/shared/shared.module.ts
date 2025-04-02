import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductoComponent } from './components/producto/producto.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedListadoProductosComponent } from './components/shared-listado-productos/shared-listado-productos.component';
import { MessagesModule } from 'primeng/messages';
import { ComentarioComponent } from './components/comentario/comentario.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NavBarComponent,
    HeaderComponent,
    SearchBoxComponent,
    Error404PageComponent,
    ProductoComponent,
    FooterComponent,
    SharedListadoProductosComponent,
    ComentarioComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MessagesModule,
    FormsModule
  ],
  exports: [
    NavBarComponent,
    HeaderComponent,
    Error404PageComponent,
    ProductoComponent,
    FooterComponent,
    SharedListadoProductosComponent,
    MessagesModule,
    ComentarioComponent
  ]
})
export class SharedModule { }
