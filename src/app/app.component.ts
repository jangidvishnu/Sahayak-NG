import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoggedInUserDataService } from './logged-in-user-data.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Sahayak';
  constructor(public loggedInUserData: LoggedInUserDataService, private cookieService: CookieService, private userService: UserService) {
    if (!loggedInUserData.isUserLoggedIn) {
      loggedInUserData.isUserHavePrivateKey = false;
    }
    let access_token = this.cookieService.get("access_token");
    if (access_token) {
      loggedInUserData.isUserLoggedIn = true;
      this.getUserDetails();
    }
    else {
      loggedInUserData.isUserLoggedIn = false;
    }
  }

  getCustomBgFlag() {
    if (window.location.href.includes('user')) {
      return true;
    }
  }

  getUserDetails() {
    this.userService.getUserDetails().subscribe(
      (res) => {
        console.log(res);
        if(res.success==true){
          this.loggedInUserData.user=res.data.user;
        }
        else{

        }
      }
      ,
      (err) => {

      }
    )
  }

}
