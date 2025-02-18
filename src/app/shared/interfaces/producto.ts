export enum CategoriaProducto {
    Percusion = 'Percusión',
    Teclas = 'Teclas',
    Viento = 'Viento',
    Membranofonos = 'Membranófonos',
    Electrofones = 'Electrófonos'
}


export interface Producto {
    _id?:string;
    nombre: string;
    descripcion: string;
    precio: number;
    cantidad?: number;
    categoria?: CategoriaProducto
    estante?: string;
    seccionEstante?: string;
    imagen?: string;
}
