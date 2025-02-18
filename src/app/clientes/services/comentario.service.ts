import { Injectable } from '@angular/core';
import { Comentario } from '../../auth/intefaces/comentario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { RespuestaProducto } from "../../shared/interfaces/respuestaProducto";
import { Producto } from '../../shared/interfaces/producto';


@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private baseURL:string = environment.API;

  constructor(private http:HttpClient) { }


  aggComentario(comentario:Comentario):Observable<RespuestaProducto>{
    const url = `/coment/add/${comentario.producto}`; // api
    const token = sessionStorage.getItem('tkn');
    
    //console.log(token);
    
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }

    //console.log(headers);

    return this.http.post<RespuestaProducto>(`${this.baseURL}${url}`,comentario,{ headers });
  }

  comentariosPRoducts(prod:Producto['_id']):Observable<RespuestaProducto>{
    const url = `/coment/producto/${prod}`;
    return this.http.get<RespuestaProducto>(`${this.baseURL}${url}`)

  }
}
