import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AcademicDocumentsComponent} from "./academic-documents/academic-documents.component";
import {AcademicListComponent} from "./academic-list/academic-list.component";

const routes: Routes = [
  {path: '', component: AcademicDocumentsComponent},
  {path: ':userId', component: AcademicListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademicRoutingModule {
}
