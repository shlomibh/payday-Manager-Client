import { Injectable } from '@angular/core';
import { Shift } from '../models/shift.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IDate } from '../models/date.model';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(
    private http: HttpClient
    ) { }

    getStatsPerMonth(identifyAPI: String, query:String, date: IDate): Observable < Shift[] > {
      return this.http.get(`/api/statistics/${identifyAPI}/q=${query}/m=${date.month}/y=${date.year}`,)
        .pipe(map((data: Shift[]) => {
          return data;
        }));
    }
}
