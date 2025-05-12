import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { RespuestaProducto } from '../../shared/interfaces/respuestaProducto';
import { Usuario } from '../../shared/interfaces/usuario';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL: string = environment.API;

  getBaseURL() {
    return this.baseURL;
  }
  constructor(private http: HttpClient) {

  }


  registroUs(usuario: Usuario): Observable<RespuestaProducto> {
    const url = `/auth/registro`; // api
    console.log(usuario);
    return this.http.post<RespuestaProducto>(`${this.getBaseURL()}${url}`, usuario);
  }

  confirmar(tkn: Usuario['token']): Observable<RespuestaProducto> {
    //console.log(tkn);
    const url = `/auth/confirmar/${tkn}`; // api
    return this.http.get<RespuestaProducto>(`${this.getBaseURL()}${url}`);
  }

  autenticarUsusrio(email: string, pass: string): Observable<RespuestaProducto> {
    const url = `/auth/login`; // api
    return this.http.post<RespuestaProducto>(`${this.getBaseURL()}${url}`, { email, pass });
  }

  solicitarNvPass(email: Usuario['nombre']): Observable<RespuestaProducto> {
    const url = '/auth/olvide-passwd';
    return this.http.post<RespuestaProducto>(`${this.getBaseURL()}${url}`, { email });
  }

  validTknNVPasswd(tkn: Usuario['token']): Observable<RespuestaProducto> {
    const url = `/auth/olvide-passwd/${tkn}`;
    return this.http.get<RespuestaProducto>(`${this.getBaseURL()}${url}`);
  }

  nwPasswd(pass: Usuario['pass'], tkn: Usuario['token']): Observable<RespuestaProducto> {
    const url = `/auth/olvide-passwd/${tkn}`;
    return this.http.post<RespuestaProducto>(`${this.getBaseURL()}${url}`, { tkn, pass })
  }

  logOut(): void {
    window.sessionStorage.clear();
    const url = `/auth/logout`;
    //this.http.get<RespuestaProducto>(`${this.getBaseURL()}${url}`).subscribe();
  }

  obtenerPerfil():Observable<RespuestaProducto> {
    const token = sessionStorage.getItem('tkn');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return this.http.get<RespuestaProducto>(`${this.baseURL}/auth/perfil`,{headers});
  }

  editarPerfil(idC:Usuario['_id'],user:Usuario):Observable<RespuestaProducto> {
    const token = sessionStorage.getItem('tkn');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    console.log(idC);
    return this.http.put<RespuestaProducto>(`${this.baseURL}/clientes/${idC}`,user,{headers});

  }

  updateCheckNoti():Observable<RespuestaProducto> {
    const token = sessionStorage.getItem('tkn');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return this.http.get<RespuestaProducto>(`${this.baseURL}/auth/notify`,{headers});
  }

  /**
   * Obtiene el rol del usuario actual desde el almacenamiento de sesión
   * @returns El rol del usuario o null si no está autenticado
   */
  getCurrentUserRole(): string | null {
    // Intentar obtener el rol del usuario desde sessionStorage
    return sessionStorage.getItem('userRole');
  }

  /**
   * Verifica si el usuario está actualmente logueado
   * @returns true si el usuario está logueado, false en caso contrario
   */
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('tkn');
  }

}
