import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Producto } from '../../../shared/interfaces/producto';
import { ProductoService } from '../../../shared/services/producto.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ComentarioService } from '../../services/comentario.service';
import { Comentario } from '../../../auth/intefaces/comentario';
import { CartService } from '../../../ventas/services/cart.service';
import { Message } from 'primeng/api';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-producto-detalles',
  templateUrl: './producto-detalles.component.html',
  styleUrl: './producto-detalles.component.css'
})
export class ProductoDetallesComponent implements OnInit, OnDestroy {

  public producto: Producto = { _id: '', nombre: '', descripcion: '', precio: 0 };
  public calif = 0;
  public productoIMG: Producto['imagen'] = '';
  private id: Producto['_id'] = '';
  @ViewChild('commentInput') commentInputRef!: ElementRef; // Referencia al textarea
  @ViewChild('cantidad') cantidad!: ElementRef; // Referencia a cantidad
  public messages: Message[] = [];
  public productosFilt:Producto[]=[];
  private routeSubscription: Subscription | undefined;
  private routerSubscription: Subscription | undefined;

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
    
    // Suscripción a los cambios de parámetros de la ruta actual
    this.routeSubscription = this.activatedRouter.params
      .subscribe(params => {
        this.id = params['ins'];
        this.obtenerProducto(this.id);
      }
    );
    
    // Suscripción a los eventos de navegación para detectar cambios en la URL
    this.routerSubscription = this.route.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });
  }
  
  ngOnDestroy(): void {
    // Cancelar suscripciones para evitar memory leaks
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
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
          // Para que se actualice la vista recargando la pagina
          location.reload(); 
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
        // Filtrar para excluir el producto actual por ID
        this.productosFilt = resp.data.filter((producto: Producto) => producto._id !== this.id);
    });
  }

}
