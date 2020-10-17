import { Component, OnInit } from '@angular/core';
import { LoggedInUserDataService } from './logged-in-user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  title = 'Sahayak';
  constructor(private loggedInUserData: LoggedInUserDataService) {
    if (!loggedInUserData.isUserLoggedIn) {
      loggedInUserData.isUserHavePrivateKey = false;
    }
  }
  
}
