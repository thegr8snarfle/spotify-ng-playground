import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.auth.isAuthenticated) {
      let req: HttpRequest<unknown> = request.clone({
        headers: request.headers.append('Authorization', `Bearer ${this.auth.authToken}`)
      });

      return next.handle(req);
    }

    return next.handle(request);
  }
}
