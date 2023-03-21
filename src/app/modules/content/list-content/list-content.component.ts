import {Component, OnInit} from '@angular/core';
import {ContentService} from "../../../shared/services/content.service";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";

export interface Content {
  id: number;
  title: string;
  url: number;
  createdDate: string;
}

@Component({
  //The component's CSS element selector.
  selector: 'app-list-content',
  // The location of the component's template file.
  templateUrl: './list-content.component.html',
  //The location of the component's private CSS styles
  styleUrls: ['./list-content.component.scss']
})


export class ListContentComponent implements OnInit {

  apiLoaded = false;
  videoList: any = [];
  selectedVideoId: string = '';
  displayedColumns: string[] = ['title', 'url', 'createdDate', 'action'];
  dataSource = new MatTableDataSource<Content>();

  constructor(private contentService: ContentService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadContent();
  }


  loadContent() {
    const userid = localStorage.getItem('user_id');
    this.contentService.getContent(userid).subscribe(res => {
      this.dataSource.data = res;
    })
  }

  delete(id: number) {
    console.log("delete", id)

  }

  view(id: number) {
    console.log("view", id)

  }
}
