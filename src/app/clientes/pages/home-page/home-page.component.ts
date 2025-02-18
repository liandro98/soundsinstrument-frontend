import { Component, OnInit, } from '@angular/core';
import { Producto } from '../../../shared/interfaces/producto';
import { ProductoService } from '../../../shared/services/producto.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{
  //
  public productosFilt:Producto[]=[];
  public productosNvs:Producto[]=[];
  public categoria:string = '';
  //
  constructor(private productoService:ProductoService) {  }
  //
  ngOnInit(): void {
    this.productosNuevos();
  }

  //
  productosNuevos():void{
    this.productoService.getProdNuevos()
      .subscribe(resp => {
        this.productosNvs = resp.data;
        console.log(resp);
      }
    );
  }

  getFiltrados(ev:any){
    this.productosFilt = ev.productos;
    this.categoria = ev.categoria;
  }


}
