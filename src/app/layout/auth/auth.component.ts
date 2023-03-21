import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {UserService} from "../../shared/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {
  // @ts-ignore
  userLoginForm: FormGroup;
  preview: string = '';

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
  }


  ngOnInit(): void {
    this.userLoginForm = this.formBuilder.group({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }


  loginWithCredentials(formValue: any) {
    const req = {
      "email": formValue.email,
      "password": formValue.password
    }
    this.userService.loginWithCredentials(req).subscribe(res => {
      if (res) {
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('user_id', res.user.id);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['academic'])
      }
    })
  }

}
