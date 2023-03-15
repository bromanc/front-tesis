import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAccountant } from 'src/app/core/schema/accountant.schema';

import { SubprocessDegreeFormComponent } from './subprocess-degree-form.component';

describe('SubprocessDegreeFormComponent', () => {
  let component: SubprocessDegreeFormComponent;
  let fixture: ComponentFixture<SubprocessDegreeFormComponent>;
  let mockBuilder: any;

  const dummyAcountant: IAccountant = {
    name: "accountant-name",
    id: '',
    phone: '',
    email: '',
    address: ''
  }

  const dummyData = {
    name: "some-name",
    accountant: dummyAcountant,
    description: "lorem"
  }

  beforeEach(async () => {
    const mockForm = new FormGroup({
      ['name']: new FormControl(),
      ['accountant']: new FormControl(),
      ['description']: new FormControl(),
    });

    mockForm.patchValue({
      ['name']: "John Doe",
      ['accountant']: dummyAcountant,
      ['description']: "process-id",
    });

    mockBuilder = jasmine.createSpyObj('FormBuilder', ['group', 'control']);
    mockBuilder.group.and.returnValue(mockForm);
    mockBuilder.control.and.returnValue();

    await TestBed.configureTestingModule({
      declarations: [SubprocessDegreeFormComponent],
      providers: [
        {
          provide: FormBuilder,
          useValue: mockBuilder,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: dummyData
        },
      ],
    })
        .compileComponents();

    fixture = TestBed.createComponent(SubprocessDegreeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should initialize the 'EnrollmentDegreeFormComponent' successfully", () => {
    component.ngOnInit();
    expect(component).toBeDefined();
    const domElement: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(domElement.querySelectorAll('form').length).toEqual(1);
    expect(domElement.querySelectorAll('mat-form-field').length).toEqual(3);
    expect(domElement.querySelectorAll('mat-label').length).toEqual(3);
    expect(domElement.querySelectorAll('input').length).toEqual(2);
    expect(domElement.querySelectorAll('button').length).toEqual(1);
  });
});
