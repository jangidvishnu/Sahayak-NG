import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api_url = environment.api_url;

  private login_url = this.api_url + 'auth/login';

  constructor(private http: HttpClient) { }

  private errorHandler(error: HttpErrorResponse) {
    if (error.status == 403) {
      console.log("No access");
    }
    return throwError(
      `${error.message}` || 'server Error'
    );
  };

  login(aadhar_number, otp = '', private_key = ''): Observable<any> {
    let data = {
      aadharNumber: aadhar_number,
      otp: otp,
      privateKey: private_key
    }
    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      })
    };
    return this.http.post<any>(this.login_url, data, httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
}
