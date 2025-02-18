import { Component, Input, OnInit } from '@angular/core';
import { Comentario } from '../../../auth/intefaces/comentario';
import { Producto } from '../../interfaces/producto';
import { ComentarioService } from '../../../clientes/services/comentario.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrl: './comentario.component.css'
})
export class ComentarioComponent implements OnInit{
  
  @Input('producto') prod:Producto['_id'] = '';
  public allComents:Comentario[] = [];
  public coments:Comentario[] = [];
  public iniciales:number = 3;
  public siguientes:number = 2;
  public actuales:number = 0;

  constructor(
    private comentarioService: ComentarioService,
  ){}
  

  ngOnInit(): void {
    this.comentariosProducto(this.prod);  
  }

  comentariosProducto(prod:Producto['_id']):void{
    this.comentarioService.comentariosPRoducts(prod)
      .subscribe(resp => {
        this.allComents = resp.data;
        this.comentsIniciales();
        console.log(this.coments);
        //console.log(this.coments[0].usuario?.nombre);
        
      });
  }

  comentsIniciales() {
    this.coments = this.allComents.slice(0, this.iniciales); // Muestra los primeros 3 productos
    this.actuales = this.iniciales;
  }

  masComents() {
    const nuevosCmts = this.allComents.slice(this.actuales, this.actuales + this.siguientes);

    this.coments = [...this.coments, ...nuevosCmts]; // Añade los siguientes productos al array actual
    this.actuales += this.siguientes; // Actualiza el índice de productos mostrados
  }



}
