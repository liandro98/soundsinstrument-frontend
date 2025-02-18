import { Component, Input } from '@angular/core';
import { AdminProductos } from '../../admin-productos';
import { ProductoService } from '../../../shared/services/producto.service';
import { CategoriaProducto, Producto } from '../../../shared/interfaces/producto';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent {

  @Input('prods') prods:Producto[] = [];
  constructor(
    private productosService: ProductoService, 
    private router:Router) {}

  producto : Producto [] = [{
    _id:"1",
    nombre: "Bateria",
    descripcion: "Suena chido",
    precio: 1234,
    cantidad: 24,
    categoria: CategoriaProducto.Percusion,
    estante: "Estante 4",
    seccionEstante: "Seccion 6",
    imagen: "bateria.jpg"
  }]


   
  

  editProduct(product: Producto['_id']) {
    // Lógica para modificar el producto
    //this.productosService.setModificando(true);
    //this.productosService.setProducto(product)
    this.router.navigate(['/administracion/edit',product]);

  }

  crearProducto(){
    // Lógica para crear el producto
    this.router.navigate(['/administracion/nuevo']);
    //this.productosService.setModificando(true);
  }

  deleteProduct(productId: Producto['_id']) {
    this.productosService.deleteProducto(productId)
      .subscribe(resp => {
        console.log(resp);
        this.router.navigate(['/administracion/']);
      })
  }

  
}
