import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { IUser } from '../../../../core/schema/user.schema';
import { ApiService } from '../../../../core/services/api/api.service';

import { StudentComponent, UsersDataSource } from './student.component';

export class MockMatDialog {
  public afterClosed(): Observable<any> {
    return of(1);
  }
}

const dummyUser: IUser = {
  created_at: '',
  email: '',
  email_verified: false,
  identities: [],
  name: '',
  nickname: '',
  picture: '',
  updated_at: '',
  user_id: '',
  last_login: '',
  last_ip: '',
  logins_count: 0,
  management: undefined
}


describe('StudentComponent', () => {
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;
  let matDialogSpy: any;
  let mockApiService: any;
  let mockDetectorRefs: any;

  beforeEach(async () => {
    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open'])
    matDialogSpy.open.and.returnValue(new MockMatDialog());

    mockApiService = jasmine.createSpyObj('ApiService', ['getUsers$', 'deleteUser$']);
    mockApiService.getUsers$.and.returnValue(of([dummyUser, dummyUser]));
    mockApiService.deleteUser$.and.returnValue(of(true));

    mockDetectorRefs = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
    mockDetectorRefs.detectChanges.and.returnValue();

    await TestBed.configureTestingModule({
      declarations: [StudentComponent],
      providers: [{
        provide: MatDialog,
        useValue: matDialogSpy,
      },
        {
          provide: ApiService,
          useValue: mockApiService,
        },
        {
          provide: ChangeDetectorRef,
          useValue: mockDetectorRefs,
        },]
    })
        .compileComponents();

    fixture = TestBed.createComponent(StudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create and initialize a 'StudentComponent' successfully", () => {
    component.ngOnInit();
    const domElement: HTMLElement = fixture.nativeElement as HTMLElement;

    expect(component).toBeDefined();
    expect(domElement.querySelectorAll('form').length).toEqual(1);
    expect(domElement.querySelectorAll('div').length).toEqual(3);
    expect(domElement.querySelectorAll('input').length).toEqual(1);
    expect(domElement.querySelectorAll('button').length).toEqual(1);
    expect(mockApiService.getUsers$).toHaveBeenCalled();
  });

  it("should trigger the 'openDialog' method successfully", () => {
    component.openDialog();
    expect(matDialogSpy.open).toHaveBeenCalled();
  });

  it("should trigger the 'openDegree' method successfully", () => {
    component.openDegree({ user_id: "user-id", name: "name" });
    expect(matDialogSpy.open).toHaveBeenCalled();
  });

  it("should trigger the 'deleteEntry' method successfully", () => {
    component.deleteUser("1234");
    expect(mockApiService.deleteUser$).toHaveBeenCalled();
    expect(mockApiService.getUsers$).toHaveBeenCalled();
  });
});

describe("UsersDataSource", () => {
  it("should initialize an UsersDataSource object successfully", () => {
    const usersDataSource = new UsersDataSource([dummyUser]);
    expect(usersDataSource).toBeDefined();
  })

  it("should trigger the 'connect' and 'disconnect' methods successfully", () => {
    const usersDataSource = new UsersDataSource([dummyUser]);
    const connectResult = usersDataSource.connect();
    usersDataSource.disconnect();
    expect(usersDataSource).toBeDefined();
    expect(connectResult).toBeDefined();
  })
});
