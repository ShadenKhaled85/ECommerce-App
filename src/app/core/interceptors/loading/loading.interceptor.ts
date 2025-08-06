import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  // Logic on Request
  const spinnerService = inject(NgxSpinnerService)
  spinnerService.show('loading2')

  return next(req).pipe( finalize( ()=>{
  spinnerService.hide('loading2')
  })) // Logic on Response

};
