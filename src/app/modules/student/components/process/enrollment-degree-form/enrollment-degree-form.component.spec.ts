import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentDegreeFormComponent } from './enrollment-degree-form.component';

describe('EnrollmentDegreeFormComponent', () => {
  let component: EnrollmentDegreeFormComponent;
  let fixture: ComponentFixture<EnrollmentDegreeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollmentDegreeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollmentDegreeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
