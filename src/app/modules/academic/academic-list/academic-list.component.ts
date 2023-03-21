import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AcademicService} from "../../../shared/services/academic.service";

@Component({
  selector: 'app-academic-list',
  templateUrl: './academic-list.component.html',
  styleUrls: ['./academic-list.component.scss']
})
export class AcademicListComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private academicService:AcademicService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param=>{
      console.log(param)
    })
  }

  loadUserDocument(userId:any){
    this.academicService.getDocumentsByUser(userId).subscribe(res=>{

    });
  }

}
