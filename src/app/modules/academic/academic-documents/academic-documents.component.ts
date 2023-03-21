import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {AcademicUploadComponent} from "../academic-upload/academic-upload.component";
import {AcademicService} from "../../../shared/services/academic.service";
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";

export interface Academic {
  id: number;
  documentName: string;
  documentType: number;
  documentUrl: number;
  createdDate: string;
}

@Component({
  selector: 'app-academic-documents',
  templateUrl: './academic-documents.component.html',
  styleUrls: ['./academic-documents.component.scss']
})
export class AcademicDocumentsComponent implements OnInit {
  dataSource = new MatTableDataSource<Academic>();
  displayedColumns: string[] = ['documentName', 'documentType', 'documentUrl', 'createdDate', 'action'];

  constructor(public dialog: MatDialog,
              private academicService: AcademicService,
              private authService: AuthService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadDocuments();
  }

  view(userId: any) {
    this.router.navigate(['academic/'+userId])
  }

  delete(id: any) {
  }

  openUpload() {
    const dialogRef = this.dialog.open(AcademicUploadComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe(()=>{
      this.loadDocuments();
    })
  }

  loadDocuments() {
    const userId = this.authService.getLoggedUserId();
    this.academicService.getDocumentsByUser(userId).subscribe(res => {
      const result = res.map((academic: any) => {
        return {
          id: academic.id,
          userId: academic.user_id,
          documentName: academic.document_name,
          documentType: academic.document_type,
          documentUrl: academic.document_url,
          createdDate: academic.created_at
        }
      })
      this.dataSource.data = result
    })
  }

}
