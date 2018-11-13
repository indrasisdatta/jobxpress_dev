import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { ActivatedRoute } from '@angular/router/src/router_state';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
      ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.authService.isLoggedIn
            .pipe(
                take(1),
                map((isLoggedIn: any) => {
                    console.log('Auth guard isLoggedIn: ', isLoggedIn);
                    if (!isLoggedIn) {
                        this.router.navigate(['/user/login']);
                        return false;
                    } 
                    return true;
                })
            )
    }
}