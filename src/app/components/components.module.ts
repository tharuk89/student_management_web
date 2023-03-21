import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {FooterComponent} from './footer/footer.component';
import {RouterModule} from "@angular/router";
import {SocialLoginModule} from "@abacritt/angularx-social-login";
import {NgxPermissionsModule, NgxPermissionsRestrictStubModule} from "ngx-permissions";
import {MatMenuModule} from "@angular/material/menu";


@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxPermissionsModule.forChild(),
    MatMenuModule
  ]
})
export class ComponentsModule {
}
