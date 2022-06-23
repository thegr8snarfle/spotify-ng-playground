import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isAuthorized: boolean = false;

    if (window?.localStorage) {
      const token = window.localStorage.getItem('auth');
      isAuthorized = !!token;
    }

    if (!isAuthorized) {
      return this.router.parseUrl('/auth');
    } else {
      return true;
    }
  }

}
