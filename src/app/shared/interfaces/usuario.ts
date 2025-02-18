export interface Usuario {
    _id:string
    nombre: string
    apellido: string
    email: string
    pass: string
    phone: string
    direccion: string
    token?: string
    confirmado?: boolean
    rol?: string
    descuento?: {
        checkNotify: boolean
        descuento: number
    }
}