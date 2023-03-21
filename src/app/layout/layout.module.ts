import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EhealthComponent} from './ehealth/ehealth.component';
import {ComponentsModule} from "../components/components.module";
import {RouterModule} from "@angular/router";
import {VerifyComponent} from './verify/verify.component';
import {NgxPermissionsModule} from "ngx-permissions";


@NgModule({
  declarations: [
    EhealthComponent,
    VerifyComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    NgxPermissionsModule.forChild()
  ]
})
export class LayoutModule {
}
