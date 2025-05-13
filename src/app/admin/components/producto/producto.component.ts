import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../../../shared/interfaces/producto';
import { ProductoService } from '../../../shared/services/producto.service';
import { Message } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-producto-form-admin',
  templateUrl: './producto.component.html',
  styleUrls: ['../../../auth/pages/login-pages/login-pages.component.css']
})
export class ProductoComponent implements OnInit {

  producto: Producto | null = null;
  productoFormulario!: FormGroup;
  public messages: Message[] = [];
  public file: File | null = null;
  public edit: boolean = false;
  public id: Producto['_id'] = ''
  public categorias = ['Percusión', 'Teclas', 'Viento', 'Membranófonos','Electrófonos'];


  constructor(
    private activatedRoute: ActivatedRoute,
    private productosService: ProductoService,
    private fb: FormBuilder,
    private router:Router
  ) { }

  ngOnInit() {

    this.activatedRoute.params
      .subscribe(params => {
        this.id = params['id'];
      }
      );

    this.initForm();

    if (this.id) {
      this.edit = true;
      this.productosService.getDetalleProducto(this.id)
        .subscribe(resp => {
          this.patchForm(resp.data.producto);
        });
    }

  }

  initForm(): void {
    this.productoFormulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
      categoria: ['', [Validators.required]],
      precio: [0, [Validators.required, Validators.min(1)]],
      cantidad: [0, [Validators.required, Validators.min(1)]],
      estante: ['', [Validators.required, Validators.minLength(2)]],
      seccionEstante: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  // Método para enviar los datos actualizados
  onSubmit() {
    if (!this.productoFormulario.valid) {
      this.messages = [{ severity: 'error', detail: "Todos los campos son obligatorios." }];
      return;
    }

    const formData: any = this.createFormData();

    if (formData) {
      this.productosService.aggProd(formData).subscribe(resp => {
        console.log(resp);
        this.messages = [{ severity: 'success', detail: resp.msg }];
        this.productoFormulario.reset();
      });
    }
  }

  onEdit() {
    
    this.productosService.editProducto(this.id,this.productoFormulario.value)
      .subscribe(resp => {
        console.log(resp);
        this.messages = [{ severity: 'success', detail: resp.msg }];
        setTimeout(() => {
          this.router.navigate(['/administracion/busqueda'])
        }, 1500);
      });
  }

  // Método para manejar la selección de la imagen
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
    }
  }

  // Método para crear FormData combinando los datos del formulario y el archivo
  private createFormData(): FormData | null {
    if (!this.file) {
      this.messages = [{ severity: 'error', detail: "Debes seleccionar una imagen." }];
      return null;
    }

    const formData = new FormData();
    formData.append('imagen', this.file, this.file.name);

    // Agregar todos los valores del formulario al FormData
    Object.keys(this.productoFormulario.controls).forEach(key => {
      formData.append(key, this.productoFormulario.get(key)?.value);
    });

    return formData;
  }

  patchForm(producto: Producto): void {
    // Llenar el formulario con los datos del producto
    console.log(producto);
    this.productoFormulario.patchValue({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      categoria: producto.categoria,
      precio: producto.precio,
      cantidad: producto.cantidad,
      estante: producto.estante,
      seccionEstante: producto.seccionEstante
    });
  }




}
