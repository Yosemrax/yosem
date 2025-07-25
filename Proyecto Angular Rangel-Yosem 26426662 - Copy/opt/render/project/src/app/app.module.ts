import { AuthInterceptor } from './core/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// ...
providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
// ...