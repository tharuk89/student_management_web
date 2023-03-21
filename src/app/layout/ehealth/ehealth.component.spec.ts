import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EhealthComponent } from './ehealth.component';

describe('EhealthComponent', () => {
  let component: EhealthComponent;
  let fixture: ComponentFixture<EhealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EhealthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EhealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
