import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { hasBackdrop: true },
    },
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      progressBar: true,
      preventDuplicates: true,
    }),
  ],
};
