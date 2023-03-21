import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {ListUserComponent} from './list-user/list-user.component';
import {AddEditUserComponent} from './add-edit-user/add-edit-user.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {GoogleMapsModule} from "@angular/google-maps";
import { UserDetailsComponent } from './user-details/user-details.component';


@NgModule({
  declarations: [
    ListUserComponent,
    AddEditUserComponent,
    UserDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    GoogleMapsModule
  ]
})
export class UserModule {
}
