import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {UserService} from "../../../shared/services/user.service";
import {NotificationService} from "../../../shared/services/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  // @ts-ignore
  userRegForm: FormGroup;
  preview: string = '';

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private notificationService: NotificationService,
              private router: Router
  ) {
  }


  ngOnInit(): void {
    this.userRegForm = this.formBuilder.group({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        email: new FormControl(''),
        mobile: new FormControl(''),
        password: new FormControl(''),
        verifyPassword: new FormControl(''),
      }
    )
  }

  save(formValue: any) {
    const req = {
      "first_name": formValue.firstName,
      "last_name": formValue.lastName,
      "email": formValue.email,
      "mobile": formValue.mobile,
      "password": formValue.password,
    }
    this.userService.createUser(req).subscribe(res => {
      this.notificationService.showSuccessMessage("Successfully registered");
      this.router.navigate([])
    },error => {
      this.notificationService.showErrorMessage("Something went wrong")
    })
  }


}
