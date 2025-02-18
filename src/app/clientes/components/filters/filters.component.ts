import { Component, EventEmitter, Output } from '@angular/core';
import { ProductoService } from '../../../shared/services/producto.service';
import { Producto } from '../../../shared/interfaces/producto';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {
  public categorias = ['Teclas','Electrófonos','Percusión','Viento','Membranófonos'];
  @Output('filtrados') filtrados:EventEmitter<any> = new EventEmitter();

  constructor(private productoService:ProductoService){}

  filtrar(categoria:string) {
    this.productoService.getProductosFiltrados({categoria})
      .subscribe(resp => {
        console.log(resp);
        this.filtrados.emit({categoria,productos:resp.data});
    });
  }
}
