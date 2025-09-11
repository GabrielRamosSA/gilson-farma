import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // Adicione esta linha

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Mudança aqui: de provideRouter([]) para provideRouter(routes)
    provideAnimations(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true,
      enableHtml: true
    })
  ]
};
