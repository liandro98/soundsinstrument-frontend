import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductoService } from '../../../shared/services/producto.service';
import { Producto } from '../../../shared/interfaces/producto';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit{
  busquedaForm: FormGroup;
  public productos:Producto[] = [];
  
  constructor(
    private fb: FormBuilder,
    private productoService:ProductoService
  ) {
    this.busquedaForm = this.fb.group({
      nombre: [''] // Inicializa el control
    });
  }

  ngOnInit(): void {
    this.productoService.getProdNuevos()
      .subscribe(
        resp => {
          console.log(resp);
          this.productos = resp.data;
        });
  }

  onSubmit() {
    this.aplicarFiltros()
  }

  aplicarFiltros() {
    const filtros = this.busquedaForm.value;
    this.productoService.getProductosFiltrados(filtros)
      .subscribe(resp => {
        this.productos = resp.data;
        console.log(resp);
        console.log(this.productos);
      });
  }
}
