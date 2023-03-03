import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { IAccountant } from 'src/app/core/schema/accountant.schema';
import { ISubprocess } from 'src/app/core/schema/process.schema';
import { ApiService } from 'src/app/core/services/api/api.service';

import { SubprocessDataSource, SubprocessFormDialogComponent } from './subprocess-form-dialog.component';

class MockDialog {
  afterClosed(): Observable<any> {
    return of(true);
  }
}

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

describe('FormSubprocessComponent', () => {
  let component: SubprocessFormDialogComponent;
  let fixture: ComponentFixture<SubprocessFormDialogComponent>;
  let mockService: any;
  let mockDetectorRef: any;
  let mockDialog: any;

  const dummyData = {
    id: "id-1234"
  }

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('ApiService', ['getSubprocessesByProcessId$', 'deleteSubprocess$']);
    mockService.getSubprocessesByProcessId$.and.returnValue(of([dummySubprocess, dummySubprocess]));
    mockService.deleteSubprocess$.and.returnValue(of(true));

    mockDetectorRef = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
    mockDetectorRef.detectChanges.and.returnValue();

    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockDialog.open.and.returnValue(new MockDialog());

    await TestBed.configureTestingModule({
      declarations: [ SubprocessFormDialogComponent ],
      providers: [
        {
          provide: MatDialog,
          useValue: mockDialog
        },
        {
          provide: ApiService,
          useValue: mockService
        },
        {
          provide: ChangeDetectorRef,
          useValue: mockDetectorRef
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: dummyData
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })

  });

  it("should initialize a new 'SubprocessFormDialogComponent' component sucessfully", () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(SubprocessFormDialogComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    const domElement: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(component).toBeDefined();
    expect(domElement.querySelectorAll('div').length).toEqual(2);
    expect(domElement.querySelectorAll('button').length).toEqual(1);
    expect(domElement.querySelectorAll('table').length).toEqual(1);
  });

  it("should execute the 'openAddSubprocessDialog' method sucessfully", async() => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(SubprocessFormDialogComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    await component.openAddSubprocessDialog();
    expect(mockService.getSubprocessesByProcessId$).toHaveBeenCalled();
    expect(mockDialog.open).toHaveBeenCalled();
  });

  it("should execute the 'editEntry' method sucessfully", async() => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(SubprocessFormDialogComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    await component.editEntry(dummySubprocess);
    expect(mockService.getSubprocessesByProcessId$).toHaveBeenCalled();
    expect(mockDialog.open).toHaveBeenCalled();
  });

  it("should execute the 'deleteEntry' method sucessfully", async() => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(SubprocessFormDialogComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    await component.deleteEntry("id-1234");
    expect(mockService.getSubprocessesByProcessId$).toHaveBeenCalled();
    expect(mockService.deleteSubprocess$).toHaveBeenCalled();
    expect(mockDialog.open).not.toHaveBeenCalled();
  });

  it("should execute the 'reloadDataSource' method sucessfully", async() => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(SubprocessFormDialogComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    await component.reloadDataSource();
    expect(mockService.getSubprocessesByProcessId$).toHaveBeenCalled();
  });
});

describe("SubprocessDataSource", () => {
  const genericData: ISubprocess[] = [dummySubprocess, dummySubprocess]
  it("should initialize a new SubprocessDataSource object successfully", () => {
    const dataSource: SubprocessDataSource = new SubprocessDataSource(genericData);
    expect(dataSource).toBeDefined();
  });

  it("should trigger all the methods successfully", () => {

    const dataSource: SubprocessDataSource = new SubprocessDataSource(genericData);
    dataSource.connect();
    dataSource.setData(genericData);
    dataSource.disconnect();
  });

});
