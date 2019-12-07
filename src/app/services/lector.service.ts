import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class LectorService {

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient
  ) { }

  getLectorsListOfDepart(id: string) {
    return this.http.get<any>(`/api/users/users-department/${id}`);
  }
  
}
