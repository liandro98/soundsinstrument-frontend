import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutcltPageComponent } from './pages/layoutclt-page/layoutclt-page.component';
import { FiltersComponent } from './components/filters/filters.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SliderProductosComponent } from './components/slider-productos/slider-productos.component';
import { HeroNosotrosComponent } from './components/hero-nosotros/hero-nosotros.component';
import { InstrumentosGeneralComponent } from './pages/instrumentos-general/instrumentos-general.component';
import { MatFormFieldModule } from '@angular/material/form-field'; // Importar para mat-form-field
import { MatInputModule } from '@angular/material/input'; // Importar para matInput
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductoDetallesComponent } from './pages/producto-detalles/producto-detalles.component'; // Para usar [(ngModel)] si es necesario
import { CarouselModule } from 'primeng/carousel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



@NgModule({
  declarations: [
    LayoutcltPageComponent,
    FiltersComponent,
    HomePageComponent,
    SliderProductosComponent,
    HeroNosotrosComponent,
    InstrumentosGeneralComponent,
    ProductoDetallesComponent,
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    ReactiveFormsModule,
    
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CarouselModule,
    
  ]
})
export class ClientesModule { }
