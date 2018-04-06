import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, ActivatedRoute } from '@angular/router';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  loginstat: string;
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
      this.loginstat = localStorage.getItem('loginstatus');
      if (this.loginstat == 'adminLogin') {
        return true;
      }  else {
        this.router.navigateByUrl('/signin');
      }
      console.log(this.loginstat);
  }
}
