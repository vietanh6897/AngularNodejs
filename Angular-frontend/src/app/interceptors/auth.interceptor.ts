import {
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { ToastrService } from 'ngx-toastr';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  const toastrService = inject(ToastrService);
  loadingService.startLoader();
  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
  return next(clonedRequest).pipe(
    tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        toastrService.success('Request successful', 'Success');
      }
    }),
    finalize(() => loadingService.stopLoader()),
    catchError((err) => {
      toastrService.error(
        Array.isArray(err.error.message)
          ? err.error.message[0]
          : err.error.message,
        'Error'
      );
      return throwError(() => err);
    })
  );
};
