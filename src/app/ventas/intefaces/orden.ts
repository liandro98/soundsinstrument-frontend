export interface Order {
    cliente?: {
        clienteId: string; // ID del cliente (referencia)
        nombre: string;     // Nombre del cliente
        email: string;      // Email del cliente
    };
    productos: ProductOrderItem[]; // Array de productos en la orden
    total: number;                 // Total de la orden
    estado: 'pendiente' | 'procesando' | 'completado' | 'cancelado'; // Estado de la orden
    creadoEn?: Date;               // Fecha de creación (opcional, puede generarse automáticamente)
}

export interface ProductOrderItem {
    productoId: string;      // ID del producto (referencia)
    cantidad: number;        // Cantidad de productos
    precio: number;          // Precio del producto
    nombre?: string;         // Nombre del producto (opcional, si deseas mostrar en el frontend)
    descripcion?: string;    // Descripción del producto (opcional)
    imagen?: string;         // URL de la imagen del producto (opcional)
}