import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ContentService} from "../../../shared/services/content.service";
import {Router} from "@angular/router";

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-upload-content',
  templateUrl: './upload-content.component.html',
  styleUrls: ['./upload-content.component.scss']
})
export class UploadContentComponent implements OnInit {
  // @ts-ignore
  contentUploadForm: FormGroup;

  constructor(private authService: AuthService, private contentService: ContentService, private formBuilder: FormBuilder,private router: Router) {

  }

  ngOnInit(): void {
    this.contentUploadForm = this.formBuilder.group(
      {
        title: new FormControl('', [Validators.required]),
        file: new FormControl('', [Validators.required]),
        fileSource: new FormControl('', [Validators.required])
      }
    )
  }

  uploadImage() {
    const userid = localStorage.getItem('user_id');
    const formData = new FormData();
    // @ts-ignore
    formData.append('file', this.contentUploadForm.get('fileSource').value);
    // @ts-ignore
    formData.append('title', this.contentUploadForm.get('title').value)
    // @ts-ignore
    formData.append('user_id', userid)
    // @ts-ignore
    console.log(this.contentUploadForm.get('title').value, " *** ")
    this.contentService.uploadImage(formData).subscribe(res => {
      this.router.navigate(['/contents'])
    })

  }

  get f() {
    return this.contentUploadForm.controls;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.contentUploadForm.patchValue({
        fileSource: file
      });
    }
  }

}
