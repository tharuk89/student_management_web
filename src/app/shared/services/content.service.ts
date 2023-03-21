import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const BASE_URL = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) {
  }

  getContent(id: any) {
    const url = BASE_URL + '/contents/' + id
    return this.http.get<any>(url);
  }

  uploadImage(request: any): Observable<any> {
    const url = BASE_URL + '/contents'
    return this.http.post<any>(url, request);
  }
}
