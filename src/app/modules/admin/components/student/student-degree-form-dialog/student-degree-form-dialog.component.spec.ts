import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { IUser } from '../../../../../core/schema/user.schema';
import { ApiService } from 'src/app/core/services/api/api.service';
import { IProcess } from '../../../../../core/schema/process.schema';

import { StudentDegreeFormDialogComponent } from './student-degree-form-dialog.component';
import { IDegree } from 'src/app/core/schema/degree.schema';

describe('StudentDegreeFormDialogComponent', () => {
  let component: StudentDegreeFormDialogComponent;
  let fixture: ComponentFixture<StudentDegreeFormDialogComponent>;
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
    id: 'degree-id',
    name: 'degree-nam,e',
    processes: [dummyProcess]
  };

  const dummyData = {
    id: "id-sample",
    name: "John Doe",
    phone: "0999999999",
    email: "john.doe@test.com",
    address: "address-sample",
    processes: "123"
  };

  const dummyUser: IUser = {
    created_at: '',
    email: '',
    email_verified: false,
    identities: [],
    name: 'user-name',
    nickname: '',
    picture: '',
    updated_at: '',
    user_id: '',
    last_login: '',
    last_ip: '',
    logins_count: 0,
    management: {
      degree: {
        _id: "degree-id"
      },
      process: {
        _id: "process-id"
      }
    }
  }

  beforeEach(async () => {
    const mockForm = new FormGroup({
      ['degree']: new FormControl(),
      ['name']: new FormControl(),
      ['process']: new FormControl(),
    });

    mockForm.patchValue({
      ['degree']: "degree-sample",
      ['name']: "John Doe",
      ['process']: "0999999999",
    });

    mockBuilder = jasmine.createSpyObj('FormBuilder', ['group', 'control']);
    mockBuilder.group.and.returnValue(mockForm);
    mockBuilder.control.and.returnValue();

    matDialogSpy = jasmine.createSpyObj('MatDialog', ['closeAll'])
    matDialogSpy.closeAll.and.returnValue();

    mockService = jasmine.createSpyObj('ApiService', ['getDegrees$', 'getUser$', 'assignDegreeToUser$', 'getDegree$']);
    mockService.getDegrees$.and.returnValue(of([dummyDegree]));
    mockService.getUser$.and.returnValue(of(dummyUser));
    mockService.assignDegreeToUser$.and.returnValue(of(true));
    mockService.getDegree$.and.returnValue(of(dummyDegree));

    await TestBed.configureTestingModule({
      declarations: [StudentDegreeFormDialogComponent],
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
          useValue: dummyData
        },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  it("should initialize the 'StudentDegreeFormDialogComponent' successfully", () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(StudentDegreeFormDialogComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    expect(component).toBeDefined();
    const domElement: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(domElement.querySelectorAll('form').length).toEqual(1);
    expect(domElement.querySelectorAll('mat-form-field').length).toEqual(3);
    expect(domElement.querySelectorAll('mat-label').length).toEqual(3);
    expect(domElement.querySelectorAll('input').length).toEqual(1);
    expect(domElement.querySelectorAll('button').length).toEqual(2);
  });

  it("should assign a new degree to a student successfully", () => {
    const newUser = { ...dummyUser }
    delete newUser.management;
    mockService.getUser$.and.returnValue(of(newUser));
    TestBed.overrideProvider(ApiService, { useValue: mockService });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(StudentDegreeFormDialogComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.save();
    expect(mockService.assignDegreeToUser$).toHaveBeenCalled();
  });
});
