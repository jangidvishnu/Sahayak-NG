import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/request.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  requests = [];
  constructor(private userService:UserService,private requestService:RequestService) { }

  ngOnInit(): void {
    this.requestService.getRequests().subscribe(
      (res)=>
      {
        this.requests = res.data.requests;
      }
    )
  }

}
