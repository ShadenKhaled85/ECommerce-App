import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const platformId = inject(PLATFORM_ID)

  if(isPlatformBrowser(platformId)){ // ONLY IF on the browser
    if( localStorage.getItem('myToken') !== null ){
      return true;
    }
    else {
      router.navigate(['/login']) // If not logged in, navigate to login
      return false;
    }
  }

  else{
    return false;
  }

};
