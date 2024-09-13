import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoteGuardService implements CanActivate {

  constructor(private router: Router,private authservice : AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    let allowed = false;
    if(this.authservice.isTokenValid())
      allowed = true;
    else
      this.router.navigate(['']);
    
    return allowed;
  }
}
