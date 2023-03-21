import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AcademicService} from "../../../shared/services/academic.service";
import {NotificationService} from "../../../shared/services/notification.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-academic-upload',
  templateUrl: './academic-upload.component.html',
  styleUrls: ['./academic-upload.component.scss']
})
export class AcademicUploadComponent implements OnInit {
  // @ts-ignore
  academicUploadForm: FormGroup;
  documentList = [
    {name: 'Ordinary Level Certificate', value: 'ordinary_level'},
    {name: 'Advance Level Certificate', value: 'advance_level'},
    {name: 'National Identity Card', value: 'nic'},
    {name: 'Other Certificate', value: 'ordinary_level'},
  ]

  constructor(private formBuilder: FormBuilder,
              private academicService: AcademicService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<AcademicUploadComponent>,
  ) {
  }

  ngOnInit(): void {
    this.academicUploadForm = this.formBuilder.group({
      documentName: '',
      documentType: '',
      file: '',
      fileSource: ''
    });
  }

  uploadImage() {
    const userid = localStorage.getItem('user_id');
    const formData = new FormData();
    // @ts-ignore
    formData.append('file', this.academicUploadForm.get('fileSource').value);
    // @ts-ignore
    formData.append('document_name', this.academicUploadForm.get('documentName').value)
    // @ts-ignore
    formData.append('document_type', this.academicUploadForm.get('documentType').value)
    // @ts-ignore
    formData.append('user_id', userid)
    // @ts-ignore
    this.academicService.uploadDocument(formData).subscribe(res => {
      this.notificationService.showSuccessMessage("Successfully upload.")
      this.dialogRef.close();
    })
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.academicUploadForm.patchValue({
        fileSource: file
      });
    }
  }

}
