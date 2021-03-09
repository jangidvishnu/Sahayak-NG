import { Component, OnInit } from '@angular/core';
import { SchemesService } from 'src/app/schemes.service';

@Component({
  selector: 'app-schemes',
  templateUrl: './schemes.component.html',
  styleUrls: ['./schemes.component.css']
})
export class SchemesComponent implements OnInit {

  schemes =[];
  constructor(private schemesService:SchemesService) {
    this.schemesService.getSchemes().subscribe(
      (res)=>
      {
        if(res.success==true){
          this.schemes= res.data.schemes;
        }
      }
    )
  }

  ngOnInit(): void {
  }

}
