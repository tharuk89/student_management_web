import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicUploadComponent } from './academic-upload.component';

describe('AcademicUploadComponent', () => {
  let component: AcademicUploadComponent;
  let fixture: ComponentFixture<AcademicUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
