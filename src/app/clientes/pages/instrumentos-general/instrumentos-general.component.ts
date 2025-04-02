import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../shared/interfaces/producto';
import { ProductoService } from '../../../shared/services/producto.service';
import { Filtro } from '../../../shared/interfaces/filtro';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-instrumentos-general',
  templateUrl: './instrumentos-general.component.html',
  styleUrls: ['./instrumentos-general.component.css']
})
export class InstrumentosGeneralComponent implements OnInit {
  public productos: Producto[] = []; // Todos los productos filtrados
  public categorias = ['Percusión', 'Teclas', 'Viento', 'Membranófonos', 'Electrófonos'];
  public filtroForm!: FormGroup;

  public products: Producto[] = []; // Productos mostrados actualmente
  public iniciales: number = 3; // Productos a mostrar inicialmente
  public siguientes: number = 3; // Productos a cargar al hacer clic en "Ver más"
  public actuales: number = 0; // Contador de productos mostrados
  showFilters = false;

  constructor(
    private productoService: ProductoService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.inicializarFormulario();
    
    // Escuchar cambios en los parámetros de la URL (para la búsqueda desde el navbar)
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        // Si hay un parámetro de búsqueda, actualizar el formulario
        this.filtroForm.patchValue({
          nombre: params['search']
        });
      }
      // Aplicar los filtros con el valor del formulario (que podría haberse actualizado)
      this.aplicarFiltros();
    });
  }

  inicializarFormulario(): void {
    this.filtroForm = this.fb.group({
      categoria: [''],
      precioMin: [''],
      precioMax: [''],
      nombre: ['']
    });
  }

  aplicarFiltros(): void {
    const filtros = this.filtroForm.value;
    this.productoService.getProductosFiltrados(filtros)
      .subscribe(resp => {
        this.productos = resp.data;
        this.reiniciarPaginacion();
      });
  }

  productsIniciales(): void {
    this.products = this.productos.slice(0, this.iniciales);
    this.actuales = this.iniciales;
  }

  masComents(): void {
    const nuevosProductos = this.productos.slice(this.actuales, this.actuales + this.siguientes);
    this.products = [...this.products, ...nuevosProductos];
    this.actuales += this.siguientes;
  }
  
  // Método para determinar si hay más productos por cargar
  hayMasProductos(): boolean {
    return this.actuales < this.productos.length;
  }

  // Método para reiniciar la paginación cuando se aplican filtros
  reiniciarPaginacion(): void {
    this.actuales = 0;
    this.productsIniciales();
  }
}