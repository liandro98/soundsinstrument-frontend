export interface Carrito {
    usuario?: string;  // ID del usuario
    productos: ProductoCarrito[];  // Array de productos en el carrito
    total: number;  // Total del carrito
    creadoEn?: Date;  // Fecha de creación del carrito (opcional)
  }
  
  export interface ProductoCarrito {
    producto: Producto;  // Detalles del producto (ID del producto)
    cantidad: number;    // Cantidad de ese producto en el carrito
    precio: number;     // Precio unitario del producto (opcional)
  }
  
  export interface Producto {
    _id: string;         // ID del producto
    nombre: string;      // Nombre del producto
    descripcion: string; // Descripción del producto
    imagen: string;      // URL de la imagen del producto
    precio: number;      // Precio del producto
  }