import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../../shared/interfaces/usuario';

@Component({
  selector: 'app-nueva-pass',
  templateUrl: './nueva-pass.component.html',
  styleUrl: '/src/app/auth/pages/login-pages/login-pages.component.css'
})
export class NuevaPassComponent {
  public nwPassForm: FormGroup;
  public titulo: string = 'Restablece tu contraseña';
  public msg: string = 'Hemos enviado un email con las instrucciones';
  public enlace: string = 'Inicio';
  public url: string = '/clientes/inicio';
  private valid = false; // si hay id?
  public id: Usuario['token'];

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private activatedRoute: ActivatedRoute) {
    this.nwPassForm = this.fb.group({
      pass: ['', Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/)]
    });
  }

  getValid(): boolean {
    return this.valid;
  }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe(params => {
        this.id = params['tkn'];
      }
      );

    console.log(this.id);
    if(this.id) {
      this.validarTknPwd(this.id);
    }
    
    
    


  }
  onSubmit() {
    if (this.nwPassForm.valid) {
      console.log('Formulario válido:', this.nwPassForm.value);
      const pass = this.nwPassForm.get('pass')!.value;
      // Aquí puedes enviar los datos del formulario, por ejemplo, a un servicio
      console.log(pass);
      this.nwPasswd(pass,this.id);
            
    } else {
      this.msg = 'Formulario no válido';
      return;
    }
  }

  validarTknPwd(tkn: Usuario['token']): void {
    this.authService.validTknNVPasswd(tkn)
      .subscribe(resp => {
        console.log(resp);
      });
  }

  nwPasswd(pass:Usuario['pass'],tkn:Usuario['token']):void{
    this.authService.nwPasswd(pass,tkn)
      .subscribe(resp => {
        console.log(resp);
        this.valid = true;
        if (this.id && this.valid) {
          this.msg = 'Se ha guardado la nueva contraseña, ¡ya puedes iniciar sesión!';
          this.enlace = 'Iniciar Sesión';
          this.url = '/auth/login';
          //comprobar token
          console.log(this.getValid());
        }
      });
  }


}
