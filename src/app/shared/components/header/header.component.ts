import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  

  public showNotify:boolean = false;
  public closed:boolean = false;
  public usr!:Usuario;


  constructor (
    private authServ:AuthService
  ) {
  
  }

  ngOnInit(): void {
    const log = window.sessionStorage.getItem('tkn') ? true : false;
    
    if(log){
      this.authServ.obtenerPerfil()
        .subscribe(resp => {
          console.log(resp);
          this.usr = resp.data;
          if(!this.usr.descuento?.checkNotify) this.showNotify = true;
        })
    }
  }

  closeNotify():void{
    // obtener cliente
    this.closed = true;
    console.log(this.closed);
    //this.usr.descuento!.checkNotify=true;
    this.authServ.updateCheckNoti()
    .subscribe(resp => {
      console.log(resp);
    });
    console.log(this.usr);
  }


}
