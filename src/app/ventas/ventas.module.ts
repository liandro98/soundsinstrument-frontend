import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoComponent } from './components/carrito/carrito.component';
import { VentasRoutingModule } from './ventas-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HistorialComprasComponent } from './pages/historial-compras/historial-compras.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CarritoComponent,
    HistorialComprasComponent
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class VentasModule { }
