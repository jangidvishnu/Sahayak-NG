import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LoggedInUserDataService } from './logged-in-user-data.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api_url = environment.api_url;

  private login_url = this.api_url + 'auth/login';
  private logout_url = this.api_url + 'auth/logout';

  constructor(private http: HttpClient,private cookieService:CookieService,private router:Router,private loggedInUserData:LoggedInUserDataService) { }

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

  logout(): Observable<any> {
    let access_token = this.cookieService.get("access_token");
    this.cookieService.delete('access_token');
    this.loggedInUserData.isUserLoggedIn=false;
    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        "authorization": access_token
      })
    };
    this.router.navigateByUrl("/login");
    return this.http.post<any>(this.logout_url, "", httpOptions).pipe(
      catchError(this.errorHandler)
    );;
  }

}
