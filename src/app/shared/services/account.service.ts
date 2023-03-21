import {Injectable} from '@angular/core';
import {BehaviorSubject, concatMap, EMPTY, finalize, from, map, Observable, of} from "rxjs";
import {environment} from "../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

const BASE_URL = `${environment.baseUrl}`;

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accountSubject: BehaviorSubject<any>;
  public account: Observable<any>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.accountSubject = new BehaviorSubject<any>(null);
    this.account = this.accountSubject.asObservable();
  }

  public get accountValue(): any {
    return this.accountSubject.value;
  }

  login() {
    // login with facebook then authenticate with the API to get a JWT auth token
    // @ts-ignore
    this.facebookLogin().pipe(concatMap(accessToken => this.apiAuthenticate(accessToken)))
      .subscribe(() => {
        // get return url from query parameters or default to home page
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
      });
  }

  facebookLogin() {
    // login with facebook and return observable with fb access token on success
    return from(new Promise<fb.StatusResponse>(resolve => FB.login(resolve)))
      .pipe(concatMap(({authResponse}) => {
        if (!authResponse) return EMPTY;
        return of(authResponse.accessToken);
      }));
  }

  apiAuthenticate(accessToken: string) {
    localStorage.setItem('fbToken', JSON.stringify(accessToken));
    return this.http.post<any>(`${BASE_URL}/auth/login/facebook`, {accessToken}).pipe(map(account => {
      this.accountSubject.next(account);
      this.startAuthenticateTimer();
      return account;
    }));
  }

  logout() {
    // revoke app permissions to logout completely because FB.logout() doesn't remove FB cookie
    // @ts-ignore
    FB.api('/me/permissions', 'delete', null, () => FB.logout());
    this.stopAuthenticateTimer();
    this.accountSubject.next(null);
    this.router.navigate(['/login']);
  }

  getAll() {
    return this.http.get<any[]>(BASE_URL);
  }

  getById(id: any) {
    return this.http.get<any>(`${BASE_URL}/${id}`);
  }

  update(id: any, params: any) {
    return this.http.put(`${BASE_URL}/${id}`, params)
      .pipe(map((account: any) => {
        // update the current account if it was updated
        if (account.id === this.accountValue.id) {
          // publish updated account to subscribers
          account = {...this.accountValue, ...account};
          this.accountSubject.next(account);
        }
        return account;
      }));
  }

  delete(id: string) {
    return this.http.delete(`${BASE_URL}/${id}`)
      .pipe(finalize(() => {
        // auto logout if the logged in account was deleted
        if (id === this.accountValue.id)
          this.logout();
      }));
  }

  // helper methods

  // @ts-ignore
  private authenticateTimeout;

  private startAuthenticateTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(this.accountValue.token.split('.')[1]));

    // set a timeout to re-authenticate with the api one minute before the token expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    // @ts-ignore
    const {accessToken} = FB.getAuthResponse();
    this.authenticateTimeout = setTimeout(() => {
      this.apiAuthenticate(accessToken).subscribe();
    }, timeout);
  }

  private stopAuthenticateTimer() {
    // cancel timer for re-authenticating with the api
    clearTimeout(this.authenticateTimeout);
  }

  publishImage(data: any) {
    // @ts-ignore
    const fbToken = JSON.parse(localStorage.getItem('fbToken'));
    //const headers =
    const fbUrl = "https://graph.facebook.com/me/photos"
    const req = {
      "url": "https://www.facebook.com/images/fb_icon_325x325.png",
      "published": true,
      "access_token": fbToken
    }
    return this.http.post(fbUrl, req);
  }
}
