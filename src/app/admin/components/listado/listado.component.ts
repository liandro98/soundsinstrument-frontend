import { Component, Input } from '@angular/core';
import { ProductoService } from '../../../shared/services/producto.service';
import { CategoriaProducto, Producto } from '../../../shared/interfaces/producto';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent {

  @Input('prods') prods:Producto[] = [];
  
  // Variables para el modal de edición
  modalVisible: boolean = false;
  productoIdSeleccionado: Producto['_id'] = '';
  
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


   
  

  // Método para abrir el modal de edición
  abrirModalEdicion(productoId: Producto['_id']) {
    this.productoIdSeleccionado = productoId;
    this.modalVisible = true;
  }
  
  // Método para actualizar un producto en la lista después de editarlo
  actualizarProductoEnLista(productoActualizado: Producto) {
    // Buscar el índice del producto en la lista
    const index = this.prods.findIndex(p => p._id === productoActualizado._id);
    
    if (index !== -1) {
      // Guardar la imagen original
      const imagenOriginal = this.prods[index].imagen;
      
      // Actualizar el producto en la lista manteniendo la imagen original
      this.prods[index] = {
        ...this.prods[index],
        ...productoActualizado,
        imagen: imagenOriginal // Aseguramos que la imagen no cambie
      };
    }
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
