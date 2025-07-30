import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const platId = inject(PLATFORM_ID)

  if( isPlatformBrowser(platId) ){
    if (localStorage.getItem('myToken') !== null ) { // if logged in, navigate to home
      router.navigate(['/home'])
      return false;
  }
    else{
      return true;
    }
  }

  else{
    return false;
  }

};
