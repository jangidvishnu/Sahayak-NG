import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoggedInUserDataService } from './logged-in-user-data.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private api_url = environment.api_url;

  private requestEditUrl = this.api_url + "user/requestEdit";
  private getRequestsUrl = this.api_url + "admin/getRequests";
  private getSingleRequestUrl = this.api_url + "admin/getSingleRequest";

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router, private loggedInUserData: LoggedInUserDataService) { }

  private errorHandler(error: HttpErrorResponse) {
    if (error.status == 403) {
      console.log("No access");
    }
    return throwError(
      `${error.message}` || 'server Error'
    );
  };

  requestEdit(editFormData): Observable<any> {
    // console.log(editFormData.getAll());
    let access_token = this.cookieService.get("access_token");
    console.log("acess_token", access_token);
    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        "authorization": access_token,
      })
    };
    return this.http.post<any>(this.requestEditUrl, editFormData, httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }


  getRequests(): Observable<any> {
    // console.log(editFormData.getAll());
    let access_token = this.cookieService.get("access_token");
    console.log("acess_token", access_token);
    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        "authorization": access_token,
      })
    };
    return this.http.get<any>(this.getRequestsUrl,httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  getSingleRequest(id): Observable<any> {
    // console.log(editFormData.getAll());
    let access_token = this.cookieService.get("access_token");
    console.log("acess_token", access_token);
    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        "authorization": access_token,
      }),
      params: new HttpParams({ fromString: "id=" + id })
    };
    return this.http.get<any>(this.getSingleRequestUrl,httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

}
