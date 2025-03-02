import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { headerInterceptor } from './core/interceptors/header/header.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loaderInterceptor } from './core/interceptors/loading/loader.interceptor';
import { handleErrorInterceptor } from './core/interceptors/handle-error/handle-error.interceptor';
import { NgOptimizedImage } from '@angular/common';
import { RenderMode } from '@angular/ssr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: 'CONFIG',
      useValue: {
        renderMode: 'browser',
        routes: {
          'productDetails/:id': {
            renderMode: 'dynamic',
          },
          'checkout/:id': { renderMode: 'dynamic' },
        },
        getPrerenderParams: () => {
          return [
            { id: '1' },
            { id: '2' }, 
          ];
        },
      },
    },

    NgOptimizedImage,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    provideAnimations(),
    provideToastr(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        headerInterceptor,
        loaderInterceptor,
        handleErrorInterceptor,
      ])
    ),
    importProvidersFrom(
      RouterModule,
      BrowserAnimationsModule
      // RouterModule.forRoot(routes)
    ),
  ],
};
