import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export abstract class ApiService {
  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  setHeaders(headers: HttpHeaders) {
    this.httpHeaders = headers;
  }

  get<T>(url: string, options?: object): Observable<T> {
    return this.http
      .get<T>(url, { headers: this.httpHeaders, ...options })
      .pipe(catchError(this.handleError));
  }

  post<T>(url: string, data: any, options?: object): Observable<T> {
    return this.http
      .post<T>(url, data, { headers: this.httpHeaders, ...options })
      .pipe(catchError(this.handleError));
  }

  put<T>(url: string, data: any, options?: object): Observable<T> {
    return this.http
      .put<T>(url, data, { headers: this.httpHeaders, ...options })
      .pipe(catchError(this.handleError));
  }

  patch<T>(url: string, data: any, options?: object): Observable<T> {
    return this.http
      .patch<T>(url, data, { headers: this.httpHeaders, ...options })
      .pipe(catchError(this.handleError));
  }

  delete<T>(url: string, options?: object): Observable<T> {
    return this.http
      .delete<T>(url, { headers: this.httpHeaders, ...options })
      .pipe(catchError(this.handleError));
  }
}
