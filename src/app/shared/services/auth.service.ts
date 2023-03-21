import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

const BASE_URL = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  loginWithGithub(): Observable<any> {
    const url = BASE_URL + '/auth/login/github'
    return this.http.get<any>(url);
  }

  loginUsingFB(code: any): Observable<any> {
    const url = BASE_URL + '/auth/login/facebook?code=' + code
    return this.http.get<any>(url);
  }

  loginWithGoogle(request: any): Observable<any> {
    const url = BASE_URL + '/auth/login/google'
    return this.http.post<any>(url, request);
  }

  loginWithTwitter(): Observable<any> {
    const url = BASE_URL + '/auth/login/twitter'
    return this.http.get<any>(url);
  }

  getLoggedUserId(){
    const userId = localStorage.getItem('user_id');
    return userId;
  }

  getLoggedUser(){
    // @ts-ignore
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }


}
