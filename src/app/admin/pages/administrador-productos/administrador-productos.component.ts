import { Component, ViewChild } from '@angular/core';
import { ProductoService } from '../../../shared/services/producto.service';
import { Producto } from '../../../shared/interfaces/producto';

@Component({
  selector: 'app-administrador-productos',
  templateUrl: './administrador-productos.component.html',
  styleUrls: ['./administrador-productos.component.css']
})
export class AdministradorProductosComponent {
  modificando: boolean = false;
  

  constructor(private productosService: ProductoService) {}

  ngOnInit() {
    // Suscribirse a `modificando` para detectar cambios

    
  }


}
