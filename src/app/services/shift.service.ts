import { Injectable } from '@angular/core';
import { Shift } from '../models/shift.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService
  ) { }

  post(shift: Shift): Observable<Shift> {
    return this.http.post(`/api/shifts`, {shift})
    .pipe(map(
      (data: Shift) => {
        return data;
      }
    ));
  }
}
