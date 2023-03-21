import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

const BASE_URL = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  createUser(request: any): Observable<any> {
    const url = BASE_URL + '/users'
    return this.http.post<any>(url, request);
  }

  loginWithCredentials(request: any): Observable<any> {
    const url = BASE_URL + '/login'
    return this.http.post<any>(url, request);
  }

  getUsers(): Observable<any> {
    const url = BASE_URL + '/users'
    return this.http.get<any>(url);
  }

  getUserById(id: any): Observable<any> {
    const url = BASE_URL + '/users/'+id
    return this.http.get<any>(url);
  }

  updateUser(id: any,request:any): Observable<any> {
    const url = BASE_URL + '/users/'+id
    return this.http.put<any>(url,request);
  }

}
