import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginTypeGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    
    const loginType = sessionStorage.getItem('loginType');

    if (loginType === 'root') {
      this.router.navigate(['/root-home']);
      return true; 
    } else if (loginType === 'app') {
      this.router.navigate(['/app-home']);
      return true; 
    } 
    this.router.navigate(['/login']);
    return true;
  }
}