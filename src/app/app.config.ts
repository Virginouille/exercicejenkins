import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';

import localeFr from '@angular/common/locales/fr';
import { authInterceptor } from './interceptors/auth.interceptor';
import { contentInterceptor } from './interceptors/content.interceptor';

registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors(
        [authInterceptor, contentInterceptor]
      )
    )
  ]
};
