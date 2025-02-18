import { Component, OnInit } from '@angular/core';
import { Order } from '../../intefaces/orden';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-historial-compras',
  templateUrl: './historial-compras.component.html',
  styleUrl: './historial-compras.component.css'
})
export class HistorialComprasComponent implements OnInit {
  public ordenes: Order[] = [];
  public filtroForm!: FormGroup;

  public onders: Order[] = [];
  public iniciales: number = 3;
  public siguientes: number = 3;
  public actuales: number = 0;
  public total:number = 0;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    // Inicializa el formulario reactivo
    this.filtroForm = this.fb.group({
      creadoEn: [],
      precioMin: [''],
      precioMax: [''],
      nombre: ['']
    });

    this.aplicarFiltros();

  }

  aplicarFiltros() {
    const filtros = this.filtroForm.value;
    //obtener todas las ordenes
    this.cartService.historialVentas(filtros)
      .subscribe(resp => {
        console.log(resp);
        this.ordenes=resp.data;
        this.elementsIniciales();
      })

  }

  elementsIniciales() {
    this.onders = this.ordenes.slice(0, this.iniciales); // Muestra los primeros 3 productos
    this.actuales = this.iniciales;
    this.calcTotal();
  }

  masElements() {
    if(this.ordenes.length > this.onders.length){
    const nvOrders = this.ordenes.slice(this.actuales, this.actuales + this.siguientes);
    this.onders = [...this.onders, ...nvOrders]; // Añade los siguientes productos al array actual
    this.actuales += this.siguientes; // Actualiza el índice de productos mostrados
    this.calcTotal();
    }
  }

  calcTotal():void {
    for(const orden of this.onders){
      const {total} = orden;
      this.total += total;
    }
  }

}
