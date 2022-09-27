import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";
@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authservice: AuthService, private router: Router) {}
     canActivate(route:ActivatedRouteSnapshot, router:RouterStateSnapshot ): 
     boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>  {

        /* 1 metodo
        return this.authservice.user.pipe(map(user => {
            //ritorna true se si vuole concedere l'accesso a product/nuovo 
            return !!user;
        }), tap(isAuth => {
            if(!isAuth) {
                this.router.navigate(['/auth'])
            }
        }));
        */
       return this.authservice.user.pipe(
           take(1),
           map(user => {
           const isAuth = !!user

           //se è autenticato ritorna true 
           if(isAuth) {
               return true
           }

           return this.router.createUrlTree(['/auth'])
       }))
     
    }
}