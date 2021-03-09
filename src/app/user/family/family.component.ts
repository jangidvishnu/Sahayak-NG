import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit {

  members=[];

  constructor(private userService:UserService) { 
    this.userService.getMembers().subscribe(
      (res)=>
      {
        if(res.success==true){
          this.members=res.data.members;
        }
      }
    )
  }

  ngOnInit(): void {
  }

}
