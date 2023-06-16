import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


export const authenticationGuard: CanActivateFn = (route, state) => {

  return true;
};
