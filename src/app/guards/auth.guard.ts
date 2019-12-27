import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// קומפננטה האחראית על אבטחה-בודקת אם היה ניסיון לגשת לדף מסויים בלי התחברות-תוך כדי שהוא מקליד
// מזהה את המשתמש הנוכחי אם מישהו אחר ניסה והוא לא קיים הוא ״זורק״ אותו לדף ההתחברות
import { AuthenticationService } from '../services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            
            return true;
        }

        
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}