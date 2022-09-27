import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ProductService } from '../core/services/product.service';
import { AuthService } from './auth.service';
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private productService: ProductService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log('request');

    // console.log(req.url);

    const modifiedRequest = req.clone({
      // headers: req.headers.append('auth', 'xyz'),
      setHeaders: { 'Content-Type': 'application/json' },
    });
    return next.handle(modifiedRequest).pipe(
      tap((event) => {
        console.log(event);
        if (event.type === HttpEventType.Response) {
          console.log('response arrived');
          console.log(event.body);
        }
      })
    );

    /*
    let jsonReq: HttpRequest<any> = req.clone({
      setHeaders: { 'Content-Type': 'application/json' },
    });
    return next.handle(jsonReq)
    */
  }
}
