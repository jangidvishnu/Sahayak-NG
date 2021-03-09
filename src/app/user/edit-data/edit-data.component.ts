import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/request.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.css']
})
export class EditDataComponent implements OnInit {

  members = [];

  member = 0;

  membername = '';

  member_field: string = "";

  memberUploadedFiles: Array<File>;


  constructor(private userService: UserService, private requestService: RequestService) {
    this.userService.getMembers().subscribe(
      (res) => {
        if (res.success == true) {
          this.members = res.data.members;
        }
      }
    )
  }



  setMember(id, name) {
    console.log("id", id);
    this.member = id;
    this.membername = name;
  }



  setMemberField(field) {
    this.member_field = field;
  }



  fileChange(element, member_no) {
    this.memberUploadedFiles = element.target.files;
  }

  request() {
    let editForm = new FormData();
    if (this.member && this.member_field && this.memberUploadedFiles.length) {

      editForm.append("member", (this.member).toString());
      editForm.append("member_field", this.member_field);
      for (var i = 0; i < this.memberUploadedFiles.length; i++) {
        editForm.append("member_file", this.memberUploadedFiles[i], this.memberUploadedFiles[i].name);
      }
    }
    this.requestService.requestEdit(editForm).subscribe(
      (res) => {
        console.log(res);
      }
    )
  }

  ngOnInit(): void {
  }

}
