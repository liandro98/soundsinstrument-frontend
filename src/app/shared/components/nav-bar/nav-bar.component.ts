import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Route, Router, RouteReuseStrategy } from '@angular/router';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})

export class NavBarComponent implements OnInit {

  public showMenu: boolean = false;
  public log: boolean = false;
  private rol:string = '';
  public usr!:Usuario;

  getRol(){
    return this.rol;
  }

  constructor(private authServ:AuthService, private route:Router){}
  
  ngOnInit(): void {
    this.log = window.sessionStorage.getItem('tkn') ? true : false;
    this.rol = window.sessionStorage.getItem('rol') ? window.sessionStorage.getItem('rol')! : '';
    if(this.log){
      this.authServ.obtenerPerfil()
        .subscribe(resp => {
          console.log(resp);
          this.usr = resp.data;
        })
    }
  }
  
  onShowMenu(): void {
    this.showMenu = !this.showMenu;
  }


  // Método que se ejecuta al hacer clic fuera del menú
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    const isClickInsideMenu = target.closest('.nav__links') || target.closest('.hamburger__btn');

    // Si el clic no está dentro del menú o botón, oculta el menú
    if (!isClickInsideMenu && this.showMenu) {
      this.showMenu = false;
    }
  }

  logOut():void {
    this.authServ.logOut();
    this.log = false;
    this.route.navigate(['/clientes']);
  }

}

