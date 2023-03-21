import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from "@angular/router";
import {EhealthComponent} from "./layout/ehealth/ehealth.component";
import {ComponentsModule} from "./components/components.module";
import {HttpClientModule} from "@angular/common/http";
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule
} from "@abacritt/angularx-social-login";
import {NgxPermissionsModule} from "ngx-permissions";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegistrationComponent} from "./modules/user/registration/registration.component";
import {AuthComponent} from "./layout/auth/auth.component";
import {environment} from "../environments/environment";
import {AccountService} from "./shared/services/account.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";

const fbLoginOptions = {
  scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
  return_scopes: true,
  enable_profile_selector: true
};

const googleLoginOptions = {
  oneTapEnabled:true,
  scope: 'profile email'
};


// @ts-ignore
let socialConfig: ({ provider: GoogleLoginProvider; id: string } | { provider: FacebookLoginProvider; id: string })[];
socialConfig = [
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("680763169512-h7lf10ok6otjgtnb7venq4pl918odd1u.apps.googleusercontent.com", googleLoginOptions)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("439984148044377", fbLoginOptions)
  },
];

export function appInitializer(accountService: AccountService) {
  return () => new Promise(resolve => {
    // wait for facebook sdk to initialize before starting the angular app
    window['fbAsyncInit'] = function () {
      // @ts-ignore
      FB.init({appId: environment.facebookAppId,
        cookie: true,
        xfbml: true,
        version    : 'v15.0'
      });

      // auto authenticate with the api if already logged in with facebook
      FB.getLoginStatus(({authResponse}) => {
        if (authResponse) {
          // @ts-ignore
          accountService.apiAuthenticate(authResponse.accessToken).subscribe().add(resolve);
        } else {
          // @ts-ignore
          resolve();
        }
      });
    };

    // load facebook sdk script
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      // @ts-ignore
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      // @ts-ignore
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  });
}

@NgModule({
  declarations: [
    AppComponent,
    EhealthComponent,
    RegistrationComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComponentsModule,
    HttpClientModule,
    SocialLoginModule,
    NgxPermissionsModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: socialConfig,
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
