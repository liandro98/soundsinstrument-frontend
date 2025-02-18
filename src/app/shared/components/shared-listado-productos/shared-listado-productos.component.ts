import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { ProductoService } from '../../services/producto.service';
import { Filtro } from '../../interfaces/filtro';

@Component({
  selector: 'app-shared-listado-productos',
  templateUrl: './shared-listado-productos.component.html',
  styleUrl: './shared-listado-productos.component.css'
})
export class SharedListadoProductosComponent implements OnInit{
  @Input('productos') public productos:Producto[]=[];

  constructor(
    private productoService:ProductoService
  ){}
  
  ngOnInit(): void {
  }

  
}
