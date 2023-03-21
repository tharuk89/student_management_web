import {Component, OnInit} from '@angular/core';
import {NgxPermissionsService} from "ngx-permissions";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  hide = false;
  menuList:any;

  constructor(private permissionService: NgxPermissionsService, private authService: AuthService) {
  }

  ngOnInit(): void {
    const user = this.authService.getLoggedUser();
    console.log(user," YYY ")
    this.menuList = [
      {
        title: 'Academic',
        route: '/academic',
        icon: '',
        hide: false
      },
      {
        title: 'Users',
        route: '/users',
        icon: '',
        hide: user.role_id==1?false:true
      },
    ]

  }



}
