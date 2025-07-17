import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { Producto } from '../../../shared/interfaces/producto';
import { ProductoService } from '../../../shared/services/producto.service';

@Component({
  selector: 'app-editar-producto-modal',
  templateUrl: './editar-producto-modal.component.html',
  styleUrls: ['./editar-producto-modal.component.css']
})
export class EditarProductoModalComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() productoId: Producto['_id'] = '';
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() productoActualizado = new EventEmitter<Producto>();
  
  productoForm!: FormGroup;
  messages: Message[] = [];
  categorias = ['Percusión', 'Teclas', 'Viento', 'Membranófonos', 'Electrófonos'];
  productoOriginal: Producto | null = null;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
      categoria: ['', [Validators.required]],
      precio: [0, [Validators.required, Validators.min(1)]],
      cantidad: [0, [Validators.required, Validators.min(1)]],
      estante: ['', [Validators.required, Validators.minLength(2)]],
      seccionEstante: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  cargarProducto(): void {
    if (this.productoId) {
      this.productoService.getDetalleProducto(this.productoId).subscribe({
        next: (resp) => {
          this.productoOriginal = resp.data.producto;
          this.patchForm(resp.data.producto);
        },
        error: (err) => {
          this.messages = [{ severity: 'error', detail: 'Error al cargar el producto' }];
          console.error(err);
        }
      });
    }
  }

  patchForm(producto: Producto): void {
    this.productoForm.patchValue({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      categoria: producto.categoria,
      precio: producto.precio,
      cantidad: producto.cantidad,
      estante: producto.estante,
      seccionEstante: producto.seccionEstante
    });
  }

  guardarCambios(): void {
    if (this.productoForm.valid && this.productoId) {
      // Asegurarnos de no enviar la imagen en la edición
      const productoEditado = {
        ...this.productoForm.value,
        // Mantenemos la imagen original del producto
        imagen: this.productoOriginal?.imagen
      };
      
      this.productoService.editProducto(this.productoId, productoEditado).subscribe({
        next: (resp) => {
          this.messages = [{ severity: 'success', detail: resp.msg }];
          
          // Emitir el producto actualizado para actualizar la tabla
          const productoActualizado = {
            ...this.productoOriginal,
            ...this.productoForm.value,
            _id: this.productoId
          };
          
          this.productoActualizado.emit(productoActualizado);
          
          // Cerrar el modal después de un breve retraso
          setTimeout(() => {
            this.cerrarModal();
          }, 1500);
        },
        error: (err) => {
          this.messages = [{ severity: 'error', detail: err.error?.msg || 'Error al actualizar el producto' }];
          console.error(err);
        }
      });
    }
  }

  cancelar(): void {
    this.cerrarModal();
  }

  cerrarModal(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.productoForm.reset();
    this.messages = [];
  }

  // Este método se llama cuando el modal se abre
  onShow(): void {
    this.cargarProducto();
  }
}
