import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/User';
import { Employee } from '../models/employee.model';

// קומפננטה הקשורה לבדיקת תאימות של משתמש-אוטונטיקציה
//      הקשורות לבקשות המשתמש שביקש בקליינט מהשרת ועדכונם http  כל הבקשות  
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
// מחזיר את המשתמש הנוכחי
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
//  הקוראת בדף הוספת עובד חדש http בקשת 
    register(employee: Employee) {
        return this.http.post<any>(`/api/users/register`, {employee});
    }
// כשאנו מבצעים התחברות למערכת ונתונים אלו נישלחים לשרת
// מקבל אימייל וסיסמא אם משתמש כזה קיים במערכת ההתחברות מתבצעת ושומר את המשתמש בזיכרון המקומי
    login(email: string, password: string) {
        return this.http.post<any>(`/api/users/login`, { email, password })
            .pipe(map(user => {
                console.log(user);
                
                if (user && user.token) {
                    
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }
// יציאה מהמערכת
    logout() {
        
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
//      idקבלת כל הנתונים של המשתמש לפי ה
    getUserDetails(id: String) {
        return this.http.get<any>(`/api/users/user/${id}`);
    }
// כשאנו מעדכנים את פרטי המשתמש שבחרנו בדף-עדכון פרטים
    update(employee: Employee) {
        return this.http.post<any>(`/api/users/update-user`, {employee});
    }
// קבלת המשתמש הנוכחי מהזכרון המקומי
    getCurrentUser() {
        return JSON.parse(localStorage['currentUser']);
    }
}