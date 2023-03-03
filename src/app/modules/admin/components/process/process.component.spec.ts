import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { IAccountant } from 'src/app/core/schema/accountant.schema';
import { IProcess, ISubprocess } from 'src/app/core/schema/process.schema';
import { ApiService } from 'src/app/core/services/api/api.service';

import { ProcessComponent, ProcessDataSource } from './process.component';


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

const dummyProcess: IProcess = {
  id: "process-id",
  name: "process name",
  subprocess: dummySubprocess,
  version: "1"
}

describe('ProcessComponent', () => {
  let component: ProcessComponent;
  let fixture: ComponentFixture<ProcessComponent>;
  let mockService: any;
  let mockDetectorRef: any;
  let mockDialog: any;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('ApiService', ['getProcesses$', 'getProcessById$', 'deleteProcess$']);
    mockService.getProcesses$.and.returnValue(of([dummyProcess, dummyProcess]));
    mockService.getProcessById$.and.returnValue(of(dummyProcess));
    mockService.deleteProcess$.and.returnValue(of(true));

    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockDialog.open.and.returnValue(new MockDialog());

    mockDetectorRef = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
    mockDetectorRef.detectChanges.and.returnValue();

    await TestBed.configureTestingModule({
      declarations: [ ProcessComponent ],
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
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
  });

  it("should initialize a new 'ProcessComponent' component sucessfully", () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(ProcessComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    const domElement: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(component).toBeDefined();
    expect(domElement.querySelectorAll('div').length).toEqual(3);
    expect(domElement.querySelectorAll('form').length).toEqual(1);
    expect(domElement.querySelectorAll('button').length).toEqual(1);
  });

  it("should trigger the 'openCreateProcessDialog' method sucessfully", () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(ProcessComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.openCreateProcessDialog();
    expect(mockDialog.open).toHaveBeenCalled();
    expect(mockService.getProcesses$).toHaveBeenCalled();
  });

  it("should trigger the 'openCreateSubprocessDialog' method sucessfully", () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(ProcessComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.openCreateSubprocessDialog("1234");
    expect(mockDialog.open).toHaveBeenCalled();
    expect(mockService.getProcesses$).toHaveBeenCalled();
    expect(mockService.getProcessById$).toHaveBeenCalled();
  });

  it("should trigger the 'editEntry' method sucessfully", () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(ProcessComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.editEntry("1234");
    expect(mockDialog.open).toHaveBeenCalled();
    expect(mockService.getProcesses$).toHaveBeenCalled();
  });

  it("should trigger the 'deleteEntry' method sucessfully", () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(ProcessComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.deleteEntry("1234");
    expect(mockService.deleteProcess$).toHaveBeenCalled();
  });

  it("should trigger the 'reloadDataSource' method sucessfully", async () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(ProcessComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    await component.reloadDataSource();
    expect(mockService.getProcesses$).toHaveBeenCalled();
  });

});

describe("ProcessDataSource", () => {
  it("should initialize a new 'ProcessDataSource' object sucessfully", () => {
    const processDataSource: ProcessDataSource = new ProcessDataSource([dummyProcess, dummyProcess]);
    expect(processDataSource).toBeDefined();
  });

  it("should trigger all the methods sucessfully", () => {
    const processDataSource: ProcessDataSource = new ProcessDataSource([dummyProcess, dummyProcess]);
    processDataSource.connect();
    processDataSource.disconnect();
    expect(processDataSource).toBeDefined();
  });
});
