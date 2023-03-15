import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, of } from 'rxjs';
import { IAccountant } from '../../../../../app/core/schema/accountant.schema';
import { ISubprocess } from '../../../../../app/core/schema/process.schema';
import { ApiService } from '../../../../../app/core/services/api/api.service';
import { IUser } from '../../../../../app/core/schema/user.schema';

import { ProcessComponent } from './process.component';

export class MockAuthService {
  user$: Observable<object> = of({ sub: "id-1234" })
}

export class MockMatDialog {
  public afterClosed(): Observable<any> {
    return of(1);
  }
}


describe('ProcessComponent', () => {
  let component: ProcessComponent;
  let fixture: ComponentFixture<ProcessComponent>;
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
  };

  const dummyAccountant: IAccountant = {
    address: "address sample",
    email: "john.doe@test.com",
    id: "accountant-id",
    name: "accountant-name",
    phone: "09999999"
  };

  const dummySubprocess: ISubprocess = {
    accountant: dummyAccountant,
    description: "some subprocess",
    id: "subprocess-id",
    name: "subprocess name",
    processId: "process-id",
  };

  beforeEach(async () => {

    const mockForm = new FormGroup({
      ['name']: new FormControl(),
      ['email']: new FormControl(),
      ['degree']: new FormControl(),
      ['process']: new FormControl(),
    });

    mockForm.patchValue({
      ['name']: "John Doe",
      ['email']: "test@example.com",
      ['degree']: "degree-123",
      ['process']: "process-12334",
    });

    mockBuilder = jasmine.createSpyObj('FormBuilder', ['group', 'control']);
    mockBuilder.group.and.returnValue(mockForm);
    mockBuilder.control.and.returnValue();

    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open'])
    matDialogSpy.open.and.returnValue(new MockMatDialog());

    mockService = jasmine.createSpyObj('ApiService', ['getUser$', 'getSubprocessesByProcessId$']);
    const noManagementUser: IUser = { ...dummyUser };
    delete noManagementUser.management;
    mockService.getUser$.and.returnValue(of(dummyUser)); // First Call
    mockService.getUser$.and.returnValue(of(noManagementUser)); // Second Call
    mockService.getSubprocessesByProcessId$.and.returnValue(of([dummySubprocess]));

    await TestBed.configureTestingModule({
      declarations: [ProcessComponent],
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
        {
          provide: AuthService,
          useValue: new MockAuthService(),
        },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  it("should initialize the 'ProcessComponent' once successfully", async () => {
    mockService = jasmine.createSpyObj('ApiService', ['getUser$', 'getSubprocessesByProcessId$']);
    mockService.getUser$.and.returnValue(of(dummyUser));
    mockService.getSubprocessesByProcessId$.and.returnValue(of([dummySubprocess]));
    TestBed.overrideProvider(ApiService, {useValue: mockService})
    TestBed.compileComponents();
    fixture = TestBed.createComponent(ProcessComponent);
    component = fixture.componentInstance;
    await component.ngOnInit();
    expect(component).toBeDefined();
    const domElement: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(domElement.querySelectorAll('div').length).toEqual(3);
    expect(mockService.getUser$).toHaveBeenCalled();
    expect(mockService.getSubprocessesByProcessId$).toHaveBeenCalled();
    expect(matDialogSpy.open).not.toHaveBeenCalled();
  });

  it("should initialize the 'ProcessComponent' twice successfully", async () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(ProcessComponent);
    component = fixture.componentInstance;
    await component.ngOnInit();
    await component.ngOnInit();
    expect(component).toBeDefined();
    expect(mockService.getUser$).toHaveBeenCalled();
    expect(mockService.getSubprocessesByProcessId$).not.toHaveBeenCalled();
    expect(matDialogSpy.open).toHaveBeenCalled();
  });

  it("should invoke the 'openEntry' method successfully", async () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(ProcessComponent);
    component = fixture.componentInstance;
    component.openEntry(dummySubprocess);
    expect(component).toBeDefined();
    expect(matDialogSpy.open).toHaveBeenCalled();
  });
});
