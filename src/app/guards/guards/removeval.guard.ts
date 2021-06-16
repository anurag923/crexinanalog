import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemovevalGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(sessionStorage.getItem('time')!=null){
      sessionStorage.removeItem('time');
    }
    else if(sessionStorage.getItem('auth_token')!=null){
      sessionStorage.removeItem('no_hours');
      sessionStorage.removeItem('h_startdate');
      sessionStorage.removeItem('h_starttime');
    }
    return true;
  }
  
}
