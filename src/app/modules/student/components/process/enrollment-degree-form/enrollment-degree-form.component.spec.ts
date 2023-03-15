import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { IDegree } from 'src/app/core/schema/degree.schema';
import { IProcess } from 'src/app/core/schema/process.schema';
import { ApiService } from 'src/app/core/services/api/api.service';

import { EnrollmentDegreeFormComponent } from './enrollment-degree-form.component';

describe('EnrollmentDegreeFormComponent', () => {
  let component: EnrollmentDegreeFormComponent;
  let fixture: ComponentFixture<EnrollmentDegreeFormComponent>;
  let mockBuilder: any;
  let matDialogSpy: any;
  let mockService: any;

  const dummyProcess: IProcess = {
    id: "some-id",
    name: "process-name",
    subprocess: null,
    version: "v1",
  };

  const dummyDegree: IDegree = {
    id: "degree-id",
    name: "degree name",
    processes: [dummyProcess]
  }

  beforeEach(async () => {
    const mockForm = new FormGroup({
      ['name']: new FormControl(),
      ['degree']: new FormControl(),
      ['process']: new FormControl(),
    });

    mockForm.patchValue({
      ['name']: "John Doe",
      ['degree']: "degree-id",
      ['process']: "process-id",
    });

    mockBuilder = jasmine.createSpyObj('FormBuilder', ['group', 'control']);
    mockBuilder.group.and.returnValue(mockForm);
    mockBuilder.control.and.returnValue();

    matDialogSpy = jasmine.createSpyObj('MatDialog', ['closeAll'])
    matDialogSpy.closeAll.and.returnValue();

    mockService = jasmine.createSpyObj('ApiService', ['getDegrees$', 'getDegree$', 'assignDegreeToUser$']);
    mockService.getDegrees$.and.returnValue(of([dummyDegree, dummyDegree]));
    mockService.getDegree$.and.returnValue(of(dummyDegree));
    mockService.assignDegreeToUser$.and.returnValue(of(true));


    await TestBed.configureTestingModule({
      declarations: [EnrollmentDegreeFormComponent],
      providers: [
        {
          provide: FormBuilder,
          useValue: mockBuilder,
        },
        {
          provide: MatDialog,
          useValue: matDialogSpy,
        },
        {
          provide: ApiService,
          useValue: mockService,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { user_id: "user-id", name: "username" }
        },
      ],
    });
  });

  it("should initialize the 'EnrollmentDegreeFormComponent' successfully", () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(EnrollmentDegreeFormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    expect(component).toBeDefined();
    const domElement: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(domElement.querySelectorAll('form').length).toEqual(1);
    expect(domElement.querySelectorAll('mat-form-field').length).toEqual(3);
    expect(domElement.querySelectorAll('mat-label').length).toEqual(3);
    expect(domElement.querySelectorAll('input').length).toEqual(1);
    expect(domElement.querySelectorAll('button').length).toEqual(1);
  });

  it("should invoke the 'onDegreeSelected' method successfully", () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(EnrollmentDegreeFormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.onDegreeSelected("degree-id");

    expect(component).toBeDefined();
    expect(mockService.getDegree$).toHaveBeenCalled();
  });

  it("should assign a degree successfully", () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(EnrollmentDegreeFormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.save();
    expect(component).toBeDefined();
    expect(mockService.assignDegreeToUser$).toHaveBeenCalled();
    expect(matDialogSpy.closeAll).toHaveBeenCalled();
  });
});
