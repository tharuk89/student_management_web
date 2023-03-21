import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

const BASE_URL = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class AcademicService {

  constructor(private http: HttpClient) { }

  uploadDocument(request: any): Observable<any> {
    const url = BASE_URL + '/academic/documents/upload'
    return this.http.post<any>(url, request);
  }

  getDocumentsByUser(userId: any): Observable<any> {
    const url = BASE_URL + '/academic/documents/'+userId
    return this.http.get<any>(url);
  }
}
