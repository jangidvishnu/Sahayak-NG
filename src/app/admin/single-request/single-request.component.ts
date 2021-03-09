import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/request.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-single-request',
  templateUrl: './single-request.component.html',
  styleUrls: ['./single-request.component.css']
})
export class SingleRequestComponent implements OnInit {

  request:any;
  id:any;

  constructor(private requestService:RequestService, private route:ActivatedRoute,private userService:UserService) {
    this.id = +this.route.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.requestService.getSingleRequest(this.id).subscribe(
      (res)=>
      {
        console.log(res);
        if(res.success==true){
          this.request=res.data.request;
        }
      }
    )
  }

  updateUser(value){
    let user_id = this.request.id;
    let field = this.request.members_field;
    this.userService.updateUser(user_id,this.id,field,value).subscribe(
      (res)=>
      {
        console.log(res);
      }
    )

  }

}
