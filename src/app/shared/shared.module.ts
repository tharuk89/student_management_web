import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {SocialLoginModule} from "@abacritt/angularx-social-login";
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    SocialLoginModule,
    MatSnackBarModule
  ]
})
export class SharedModule {
}
