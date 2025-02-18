import axios  from "axios";
import { environment } from "../../environments/environment";

/**
   * Funcion para mostar una alerta 
   * @param mensage mensage que se mostrara al usuario
   * @param tipoMensaje admite cualquier cadena para no mostrar como error
   */
const setAlerta =(mensage:string,isError:boolean=true)=>{
    let data = { msg:mensage, error:isError };
    return data;
};

/**
 * Funcion para crear un cliente de Axios
 */
const clienteAxios = axios.create({
  baseURL:`${environment.API}`
});

export {
    setAlerta,
    clienteAxios,
}