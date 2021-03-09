import { Component, OnInit } from '@angular/core';
import { LoggedInUserDataService } from '../logged-in-user-data.service';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  imageUrl = environment.image_url;
  spinnerFlag = false;
  otpSentFlag = false;

  loginForm = new FormGroup({
   username: new FormControl('', [Validators.required]),
   password: new FormControl('',[Validators.required]),
    
  });

  constructor(private cookieService: CookieService,private router: Router, public loggedInUserDataService: LoggedInUserDataService, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    if(this.loggedInUserDataService.isUserLoggedIn){
      this.router.navigateByUrl('/user');
    }
  }

  login() {
    this.spinnerFlag = true;
    let username = this.loginForm.get('username').value;
    let password = this.loginForm.get('password').value;

    this.authService.adminLogin(username,password).subscribe(
      (res) => {
        console.log(res);
        this.spinnerFlag = false;
        if (res.success == true) {
          this.loggedInUserDataService.user=res.data.user;
          this.loggedInUserDataService.isUserLoggedIn=true;
          let acc_tok = res.accessToken;
          this.cookieService.set('access_token', "Bearer " + acc_tok);
          this.router.navigateByUrl('/admin');
        }
        console.log(res);
      },
      (err) => {
        this.spinnerFlag = false;
        this.toastr.error(err, "Sahayak Admin", { closeButton: true });
      }
    )
  }
}
