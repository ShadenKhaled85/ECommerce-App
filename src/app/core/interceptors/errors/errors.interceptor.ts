import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {

  // Logic on Request

  const toastrService = inject(ToastrService)

  return next(req).pipe(catchError ((err) =>{
    // Logic error
    console.log(err);
    toastrService.error(err.error.message)

    return throwError( ()=> err )
  })); // Logic on Response
};
