import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedInUserDataService {

  public isUserLoggedIn: boolean;
  public isUserHavePrivateKey: boolean;

  constructor() { }

}
