import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {NgxPermissionsService} from "ngx-permissions";

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  code: any;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router, private permissionService: NgxPermissionsService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
        this.code = params.code;
        if (this.router.url?.split('/')[2]?.split('?')[0] === 'facebook') {
          this.loginWithFb(this.code)
        }
      }
    );
  }

  loginWithFb(code: any) {
    this.authService.loginUsingFB(code).subscribe(res => {
      localStorage.setItem('access_token', res.access_token);
      this.permissionService.loadPermissions(res.permissions);
      localStorage.setItem('permissions', JSON.stringify(res.permissions));
      //this.loginLoadPermission();
      this.router.navigate(['/dashboard'])
    })
  }


}
