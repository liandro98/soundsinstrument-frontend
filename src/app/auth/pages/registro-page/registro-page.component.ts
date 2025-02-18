import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from '../../../shared/interfaces/producto';
import { Usuario } from '../../../shared/interfaces/usuario';
import { AuthService } from '../../services/auth.service';
import { RespuestaProducto } from '../../../shared/interfaces/respuestaProducto';


interface Msg {
  title: string;
  msg: string;
}

@Component({
  selector: 'app-registro-page',
  templateUrl: './registro-page.component.html',
  styleUrls: ['./registro-page.component.css']
})


export class RegistroPageComponent implements OnInit {
  personalFormGroup!: FormGroup;
  securityFormGroup!: FormGroup;
  additionalFormGroup!: FormGroup;
  public msg:Msg = {title:'',msg:''};

  constructor(
    private _formBuilder: FormBuilder, 
    private router: Router,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.personalFormGroup = this._formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.securityFormGroup = this._formBuilder.group({
      pass: ['', Validators.required],
    });

    this.additionalFormGroup = this._formBuilder.group({
      phone: ['',Validators.required],
      direccion:['',Validators.required]
    });
  }

  onSubmit(): void {
    const formData:Usuario = {
      ...this.personalFormGroup.value,
      ...this.securityFormGroup.value,
      ...this.additionalFormGroup.getRawValue(), // getRawValue() para obtener campos deshabilitados
    };
    console.log('Datos del formulario:', formData);
    this.register(formData);
    this.register
    setTimeout(() => {
      this.router.navigate(['/auth/confirmar']);
    }, 1000);

  }

  register(user:Usuario) {
    this.authService.registroUs(user)
      .subscribe(resp=>{
        console.log(resp);
      });
  }
}
