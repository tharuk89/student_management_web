import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AccountService} from "../../shared/services/account.service";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private accountService: AccountService,private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('fbToken');
    this.accountService.logout();
    this.router.navigate(['login'])
  }

  updateProfile(){
    this.router.navigate(['users/'+this.authService.getLoggedUserId()])
  }
}
