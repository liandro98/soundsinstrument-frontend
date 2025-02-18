import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {

@Input('producto') producto!: Producto;
@Input('imagen') imgProducto: Producto['imagen'] = '' ;

constructor(
  private productoService:ProductoService
){}

getProducto(){
  let product:Producto;
  product = {
    _id:this.producto._id,
    nombre:this.producto.nombre,
    descripcion:this.producto.descripcion,
    precio:this.producto.precio,
    imagen:this.producto.imagen
  };
  return product;
}
  
}
