import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const userRole = window.sessionStorage.getItem('rol'); // Obtiene el rol del usuario almacenado
  const expectedRole = route.data['expectedRole']; // Obtiene el rol esperado de la configuración de la ruta

  if (userRole && expectedRole.includes(userRole)) {
    return true; // Permite la navegación si el rol es correcto
  }

  // Guarda la URL actual antes de redirigir al login
  sessionStorage.setItem('redirectUrl', state.url);
  
  // Redirige al login si no está autenticado o no tiene el rol necesario
  router.navigate(['/auth/login']);
  return false;
};
