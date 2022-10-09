import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiServiceService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service:ApiServiceService ,private router:Router){}
  canActivate(){
    if(this.service.isLogedIn()){
      return true;
    }
    this.router.navigate(['/login'])
    return  false;
  }

}
