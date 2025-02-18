import { Injectable, computed, effect, signal } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { RespuestaProducto } from '../../shared/interfaces/respuestaProducto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Carrito, Producto } from '../intefaces/carrito';
import { Order } from '../intefaces/orden';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  ///
  private baseURL: string = environment.API;
  
  ///
  constructor(
    private http: HttpClient
  ) {
    // Cuando alguna señal cambie, se hace las sentencias indicadas
    // Aqui solo se le da la instruccion de almacenar en localStrorage
    // No se permite la escritura a signals
  }
  ///


  addToCart(productoId: string, cantidad: number): Observable<any> {
    const token = sessionStorage.getItem('tkn');
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }

    return this.http.post(`${this.baseURL}/carrito/agregar`, { productoId, cantidad }, { headers });
  }

  removeFromCartB(productoId: string): Observable<any> {
    const token = sessionStorage.getItem('tkn');
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }

    return this.http.delete(`${this.baseURL}/carrito/eliminar`, { headers, body: { productoId } });
  }

  increaseQuantityB(productoId: string): Observable<any> {
    const token = sessionStorage.getItem('tkn');
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }

    return this.http.put(`${this.baseURL}/carrito/incrementar`, { productoId }, { headers });
  }

  decreaseQuantityB(productoId: Producto['_id']): Observable<any> {
    const token = sessionStorage.getItem('tkn');
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }

    return this.http.put(`${this.baseURL}/carrito/decrementar`, { productoId }, { headers });
  }

  // Método para obtener el carrito del usuario
  fetchCart():Observable<RespuestaProducto>{
    const token = sessionStorage.getItem('tkn');
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }

    return this.http.get<RespuestaProducto>(`${this.baseURL}/carrito/`, { headers })
      .pipe(
        catchError(error => of())
      )
  }

  // Metodo para realizar la compra
  realizarCompra(orden:Order):Observable<RespuestaProducto>{
    const token = sessionStorage.getItem('tkn');
    let headers = new HttpHeaders();
    
    console.log(orden)
    
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    

    return this.http.post<RespuestaProducto>(`${this.baseURL}/carrito/compras`,{orden},{ headers });
    
  }

  borrarTodo():Observable<RespuestaProducto>{
    const token = sessionStorage.getItem('tkn');
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }

    return this.http.delete<RespuestaProducto>(`${this.baseURL}/carrito/eliminar-all`,{ headers });
  }

  historialCompras():Observable<RespuestaProducto> {
    const token = sessionStorage.getItem('tkn');
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }

    return this.http.get<RespuestaProducto>(`${this.baseURL}/orden/historial-compras`,{ headers });
  }
  
  historialVentas(filtros: { creadoEn?: Date; precioMin?: number; precioMax?: number; nombre?: string }):Observable<RespuestaProducto> {
    const token = sessionStorage.getItem('tkn');
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }

    return this.http.post<RespuestaProducto>(`${this.baseURL}/orden/historial-ventas`,filtros,{ headers });
  }
}
