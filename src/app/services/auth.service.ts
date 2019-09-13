import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  auth(data: any) {
    return this.http.post(`${environment.apiUrl}/account/login`, data);
  }

  createUser(data: any) {
    return this.http.post(`${environment.apiUrl}/account`, data);
  }

  resetPassword(data: any) {
    return this.http.put(`${environment.apiUrl}/account`, data);
  }
}
