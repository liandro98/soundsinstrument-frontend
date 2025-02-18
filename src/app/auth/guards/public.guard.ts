import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const publicGuard: CanActivateFn = (route, state) => {

  if(window.sessionStorage.getItem('tkn')){
    const router = inject(Router);
    console.log('Hay');
    router.navigate(['/clientes'])
    return false;
  }else {
    return true;
  }

};
