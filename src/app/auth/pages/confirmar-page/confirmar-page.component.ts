import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../../shared/interfaces/usuario';

@Component({
  selector: 'app-confirmar-page',
  templateUrl: './confirmar-page.component.html',
  styleUrl: './confirmar-page.component.css'
})
export class ConfirmarPageComponent implements OnInit{
  public titulo:string = 'Confirma tu cuenta';
  public msg:string = 'Tu cuenta esta casi lista. Hemos enviado un correo de con los pasos siguientes.';
  public enlace:string = 'Inicio';
  public url:string = '/clientes/inicio';
  constructor(
    private activatedRoute:ActivatedRoute,
    private authService:AuthService
  ){}

  ngOnInit(): void {
    let id:string|null = null;
    
    this.activatedRoute.params
      .subscribe(params => {
        id = params['tkn'];
      }
    );
    
    console.log(id);

    if(id){
      this.titulo = 'Cuenta confirmada';
      this.msg = 'La cuenta se confirmo correctamente, ¡ya puedes iniciar sesión!';
      this.enlace = 'Iniciar Sesión';
      this.url = '/auth/login';
      this.confirmar(id);
    }


  }

  confirmar(tkn:Usuario['token']) {
    this.authService.confirmar(tkn)
      .subscribe(resp => {
        console.log(resp);
      });
  }
  
}
