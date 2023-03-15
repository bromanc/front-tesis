import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ApiService } from '../../../../../../app/core/services/api/api.service';
import { IUser } from '../../../../../../app/core/schema/user.schema';

import { StudentFormDialogComponent } from './student-form-dialog.component';

describe('StudentFormDialogComponent', () => {
  let component: StudentFormDialogComponent;
  let fixture: ComponentFixture<StudentFormDialogComponent>;
  let mockBuilder: any;
  let matDialogSpy: any;
  let mockService: any;

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
      ['name']: new FormControl(),
      ['email']: new FormControl(),
    });

    mockForm.patchValue({
      ['name']: "John Doe",
      ['email']: "test@example.com",
    });

    mockBuilder = jasmine.createSpyObj('FormBuilder', ['group', 'control']);
    mockBuilder.group.and.returnValue(mockForm);
    mockBuilder.control.and.returnValue();

    matDialogSpy = jasmine.createSpyObj('MatDialog', ['closeAll'])
    matDialogSpy.closeAll.and.returnValue();

    mockService = jasmine.createSpyObj('ApiService', ['createUser$']);
    mockService.createUser$.and.returnValue(of(dummyUser));

    await TestBed.configureTestingModule({
      declarations: [StudentFormDialogComponent],
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
          useValue: {}
        },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  it("should initialize the 'StudentFormDialogComponent' successfully", () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(StudentFormDialogComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    expect(component).toBeDefined();
    const domElement: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(domElement.querySelectorAll('form').length).toEqual(1);
    expect(domElement.querySelectorAll('mat-form-field').length).toEqual(2);
    expect(domElement.querySelectorAll('mat-label').length).toEqual(2);
    expect(domElement.querySelectorAll('input').length).toEqual(2);
    expect(domElement.querySelectorAll('button').length).toEqual(2);
  });

  it("should create a new student successfully", () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(StudentFormDialogComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.save();
    expect(component).toBeDefined();
    expect(mockService.createUser$).toHaveBeenCalled();
    expect(matDialogSpy.closeAll).toHaveBeenCalled();
  });
});
