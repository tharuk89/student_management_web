import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {catchError, map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../shared/services/user.service";
import {NotificationService} from "../../../shared/services/notification.service";

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {
  apiLoaded: Observable<boolean>;
  // @ts-ignore
  userProfileForm: FormGroup

  zoom = 12;
  display: any

  lng: any
  lat: any

  center: any;

  currentLocation: any
  userId:any;
  user:any

  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];

  constructor(private formBuilder: FormBuilder,
              private httpClient: HttpClient,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private notificationService: NotificationService
  ) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
    activatedRoute.params.subscribe(param => {
      this.userId = param.id;
      this.loadUserDetails(param.id)
    })
    this.getCurrentLocation();

  }

  ngOnInit(): void {
    this.userProfileForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      address: '',
      location: ''
    })
  }

  updateProfile() {
    console.log(this.userProfileForm.value)
    const requestData = {

    }
    this.userService.updateUser(this.userId,requestData).subscribe(res=>{})
  }

  moveMap(event: google.maps.MapMouseEvent) {
    // @ts-ignore
    this.center = (event.latLng.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
    // @ts-ignore
    this.display = event.latLng.toJSON();
  }

  public getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lng = +position.coords.longitude;
        this.lat = +position.coords.latitude;
        this.center = {lat: this.lat, lng: this.lng};
        this.currentLocation = {lat: this.lat, lng: this.lng}
      });
    } else {
      this.notificationService.showErrorMessage("Geolocation is not supported by this browser.")
    }
  }

  addMarker(event: google.maps.MapMouseEvent) {
    // @ts-ignore
    this.markerPositions.push(event.latLng.toJSON());
    // @ts-ignore
    this.currentLocation = event.latLng.toJSON();
  }


  loadUserDetails(userId: any) {
      this.userService.getUserById(userId).subscribe(res=>{
        this.user = res;
        this.userProfileForm.patchValue({
          firstName: res.first_name,
          lastName: res.last_name,
          email: res.email,
          mobile: res.mobile,
          address: res.address,
          location: (res.location !=null)?res.location: JSON.stringify(this.currentLocation)
        })
      })
  }
}
