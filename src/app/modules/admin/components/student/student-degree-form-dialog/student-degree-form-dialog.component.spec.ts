import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDegreeFormDialogComponent } from './student-degree-form-dialog.component';

describe('StudentDegreeFormDialogComponent', () => {
  let component: StudentDegreeFormDialogComponent;
  let fixture: ComponentFixture<StudentDegreeFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDegreeFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentDegreeFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
