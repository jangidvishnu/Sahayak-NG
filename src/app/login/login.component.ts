import { Component, OnInit } from '@angular/core';
import { LoggedInUserDataService } from '../logged-in-user-data.service';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  imageUrl = environment.image_url;
  spinnerFlag = false;
  otpSentFlag = false;

  loginForm = new FormGroup({
    aadharNumber: new FormControl('', [Validators.required]),
    otp: new FormControl(''),
    privateKey: new FormControl('')
  });

  constructor(private router: Router, public loggedInUserDataService: LoggedInUserDataService, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  setPrivateKeyStatus(status) {
    this.loggedInUserDataService.isUserHavePrivateKey = status;
  }

  login() {
    this.spinnerFlag = true;
    let aadharNumber = this.loginForm.get('aadharNumber').value;
    let privateKey = this.loginForm.get('privateKey').value;
    let otp = this.loginForm.get('otp').value;
    this.authService.login(aadharNumber, otp, privateKey).subscribe(
      (res) => {
        this.spinnerFlag = false;
        if (res.success == false) {
          if (res.otp == true) {
            this.otpSentFlag = true;
            this.toastr.success(res.msg, "Sahayak Admin", { closeButton: true });
          }
          else {
            this.toastr.error(res.msg, "Sahayak Admin", { closeButton: true });
          }
        }
        else {
          this.router.navigateByUrl('/user/dashboard');
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
