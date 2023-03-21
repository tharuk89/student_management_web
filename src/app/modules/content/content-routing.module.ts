import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListContentComponent} from "./list-content/list-content.component";
import {UploadContentComponent} from "./upload-content/upload-content.component";

const routes: Routes = [
  {
    path: '', component: ListContentComponent
  },
  {
    path: 'upload', component: UploadContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule {
}
