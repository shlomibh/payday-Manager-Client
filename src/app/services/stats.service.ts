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

    getStatsPerMonth(identifyAPI: String, date: IDate): Observable < Shift[] > {
      console.log(`statistics/${identifyAPI}/m=${date.month}/y=${date.year}`);
      return this.http.get(`/api/statistics/${identifyAPI}/m=${date.month}/y=${date.year}`)
        .pipe(map((data: Shift[]) => {
          return data;
        }));
    }
}
