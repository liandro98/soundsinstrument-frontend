import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../../shared/interfaces/usuario';
import { Order } from '../../../ventas/intefaces/orden';
import { CartService } from '../../../ventas/services/cart.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  public usuario!:Usuario;
  public historialCompras: Order[] = [];
  private autorized:boolean = false;

  constructor(private authService:AuthService, private cartService:CartService) {}

  ngOnInit(): void {
    this.obtenerPerfil();
    this.autorized = window.sessionStorage.getItem('rol') === 'Cliente' && window.sessionStorage.getItem('rol') !== 'ADMTlN';
  }
  
  getAutorized(){
    return this.autorized;
  }

  obtenerPerfil(): void {
    this.authService.obtenerPerfil().subscribe({
      next: (data) => {
        this.usuario = data.data;
        console.log(this.usuario);
        this.obtenerCompras();
      },
      error: (err) => console.error(err)
    });
  }

  obtenerCompras():void {
    this.cartService.historialCompras()
      .subscribe(resp => {
        console.log(resp);
        this.historialCompras = resp.data;
      })
  }
}
