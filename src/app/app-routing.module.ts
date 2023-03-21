import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EhealthComponent} from "./layout/ehealth/ehealth.component";
import {AuthComponent} from "./layout/auth/auth.component";
import {VerifyComponent} from "./layout/verify/verify.component";
import {RegistrationComponent} from "./modules/user/registration/registration.component";

const routes: Routes = [

  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'signup',
    component: RegistrationComponent,
  },
  {
    path: 'academic',
    component: EhealthComponent,
    loadChildren: () => import('./modules/academic/academic.module').then(m => m.AcademicModule)
  },
  {
    path: 'users',
    component: EhealthComponent,
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'login/facebook',
    component: VerifyComponent
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
