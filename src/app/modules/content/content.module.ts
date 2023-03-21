import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContentRoutingModule} from './content-routing.module';
import {ListContentComponent} from './list-content/list-content.component';
import {YouTubePlayerModule} from "@angular/youtube-player";
import {EmbeddedMediaModule} from "ngx-embedded-media";
import {MatTableModule} from "@angular/material/table";
import {UploadContentComponent} from './upload-content/upload-content.component';
import {FileUploadModule} from "ng2-file-upload";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ListContentComponent,
    UploadContentComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    YouTubePlayerModule,
    EmbeddedMediaModule.forRoot(),
    MatTableModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class ContentModule { }
