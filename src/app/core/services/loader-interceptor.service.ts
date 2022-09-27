import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable()
export class LoaderInterceptorService implements HttpInterceptor {
  constructor(private _loading: LoaderService) {}

  /**
   * Questa classe serve per intercettare le richieste http.
   * All'avvio di una richiesta, impostiamo la proprietà loadingSub su true.
   * Una volta che la richiesta è stata completata e abbiamo una risposta, imposta la proprietà loadingSub su false.
   *  Se si verifica un errore durante la gestione della richiesta, impostare la proprietà loadingSub su false.
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // this.loaderService.show();

    // return next.handle(req).pipe(finalize(() => this.loaderService.hide()));
    this._loading.setLoading(true, request.url);
    return next
      .handle(request)
      .pipe(
        catchError((err) => {
          this._loading.setLoading(false, request.url);
          return err;
        })
      )
      .pipe(
        map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
          if (evt instanceof HttpResponse) {
            this._loading.setLoading(false, request.url);
          }
          return evt;
        })
      );
  }
}
