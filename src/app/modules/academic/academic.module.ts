import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AcademicRoutingModule} from './academic-routing.module';
import {AcademicListComponent} from './academic-list/academic-list.component';
import {AcademicDocumentsComponent} from './academic-documents/academic-documents.component';
import {MatTableModule} from "@angular/material/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AcademicUploadComponent} from './academic-upload/academic-upload.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    AcademicListComponent,
    AcademicDocumentsComponent,
    AcademicUploadComponent
  ],
  imports: [
    CommonModule,
    AcademicRoutingModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule
  ]
})
export class AcademicModule {
}
