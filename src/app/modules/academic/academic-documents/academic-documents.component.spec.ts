import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicDocumentsComponent } from './academic-documents.component';

describe('AcademicDocumentsComponent', () => {
  let component: AcademicDocumentsComponent;
  let fixture: ComponentFixture<AcademicDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicDocumentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
