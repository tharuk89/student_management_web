import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RouterModule} from "@angular/router";
import {NgxPermissionsModule} from "ngx-permissions";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AcedamicComponent } from './acedamic/acedamic.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AcedamicComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxPermissionsModule.forChild(),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ModulesModule {
}
