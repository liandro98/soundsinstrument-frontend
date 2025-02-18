import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { Producto } from '../../../shared/interfaces/producto';
import { ProductoService } from '../../../shared/services/producto.service';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { ComentarioService } from '../../services/comentario.service';
import { Comentario } from '../../../auth/intefaces/comentario';
import { CartService } from '../../../ventas/services/cart.service';
import { Message } from 'primeng/api';


@Component({
  selector: 'app-producto-detalles',
  templateUrl: './producto-detalles.component.html',
  styleUrl: './producto-detalles.component.css'
})
export class ProductoDetallesComponent implements OnInit {

  public producto: Producto = { _id: '', nombre: '', descripcion: '', precio: 0 };
  public calif = 0;
  public productoIMG: Producto['imagen'] = '';
  private id: Producto['_id'] = '';
  @ViewChild('commentInput') commentInputRef!: ElementRef; // Referencia al textarea
  @ViewChild('cantidad') cantidad!: ElementRef; // Referencia a cantidad
  public messages: Message[] = [];
  public productosFilt:Producto[]=[];

  constructor(
    private productoService: ProductoService,
    private activatedRouter: ActivatedRoute,
    private comentarioService: ComentarioService,
    private cartService: CartService,
    private route: Router
  ) { }

  getProd(){
    return this.id;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.id = '';
    this.activatedRouter.params
      .subscribe(params => {
        this.id = params['ins'];
      }
    );
    
    this.obtenerProducto(this.id);
  }
  
  obtenerProducto(id: Producto['_id']) {
    this.productoService.getDetalleProducto(id)
    .subscribe(resp => {
      console.log(resp);
      this.producto = resp.data.producto;
      this.productoIMG = resp.data.imagenUrl;
      this.filtrar(resp.data.producto.categoria);
      console.log(this.productoIMG);
      });
  }

  
  selectStar(num: number) {
    console.log(num);
    this.calif = num;
  }

  onSubmitCmts(): void {
    if (window.sessionStorage.getItem('rol')) {
      const commentText: Comentario['comentario'] = this.commentInputRef.nativeElement.value;
      let comentario: Comentario = { producto: this.id, calificacion: this.calif, comentario: commentText };
      this.comentarioService.aggComentario(comentario)
        .subscribe(resp => {
          console.log(resp);
        });
    } else {
      let url: string = `/clientes/instrumento/${this.id}`;
      window.sessionStorage.setItem('redirectUrl', url);
      this.route.navigate(['/auth/login']);

    }

  }

  aggCart(): void {
    if (window.sessionStorage.getItem('rol')) {
      const cantidad: Producto['cantidad'] = this.cantidad.nativeElement.value;
      //console.log(cantidad);
      if(cantidad! > this.producto.cantidad!){
        this.messages = [{ severity: 'error', detail: "No puedes agregar más productos de los disponibles!" }]; 
        return;
      } 
      this.cartService.addToCart(this.getProd()!,cantidad ? cantidad : 1).
      subscribe(resp => {
        console.log(resp);
        this.messages = [{ severity:'success', detail: "Producto agregado!" }]; 

      });
    } else {
      let url: string = `/clientes/instrumento/${this.id}`;
      window.sessionStorage.setItem('redirectUrl', url);
      this.route.navigate(['/auth/login']);

    }
  }

  filtrar(categoria:string) {
    this.productoService.getProductosFiltrados({categoria})
      .subscribe(resp => {
        console.log(resp);
        this.productosFilt = resp.data;
    });
  }

}
