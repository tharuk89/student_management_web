import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListUserComponent} from "./list-user/list-user.component";
import {AddEditUserComponent} from "./add-edit-user/add-edit-user.component";

const routes: Routes = [
  {path: '', component: ListUserComponent},
  {path: ':id', component: AddEditUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
