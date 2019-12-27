import { Injectable } from '@angular/core';
import { Shift } from '../models/shift.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IDate } from '../models/date.model';
//   הקשורות למשמרות http  קומפננטה הקשורה לבקשות   
@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  constructor(
    private http: HttpClient
  ) { }


// מחזיר את המשמרות
  get(id: String): Observable<Shift[]> {
    return this.http.get(`/api/shifts/${id}`)
      .pipe(map((data: Shift[]) => {
        return data;
      }));
  }
//מחזיר את המשמרות לפי התאריך שניבחר
  getPerMonth(id: String, date: IDate): Observable<Shift[]> {
    console.log(date);
    return this.http.get(`/api/shifts/${id}/m=${date.month}/y=${date.year}`)
      .pipe(map((data: Shift[]) => {
        return data;
      }));
  }
// דיווח על משמרת
  post(shift: Shift): Observable<Shift> {
    return this.http.post(`/api/shifts/${shift.employeeId}`, { shift })
      .pipe(map(
        (data: Shift) => {
          return data;
        },
        error => {
          return error;
        }
      ));
  }
//משמרות שאושרו ע״י המרצה
  submitShifts(employeeId: string, date: IDate) {
    console.log(date);
    return this.http.post(`/api/shifts/submit/${employeeId}`, { employeeId, date });
  }
//מחיקת משמרת
  delete(shiftId: string) {
    return this.http.delete(`/api/shifts/${shiftId}`);
  }

}
