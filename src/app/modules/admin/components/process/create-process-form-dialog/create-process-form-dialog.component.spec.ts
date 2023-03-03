import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { IAccountant } from 'src/app/core/schema/accountant.schema';
import { IProcess, ISubprocess } from 'src/app/core/schema/process.schema';
import { ApiService } from 'src/app/core/services/api/api.service';

import { CreateProcessFormDialogComponent } from './create-process-form-dialog.component';

describe('FormDialogComponent', () => {
  let component: CreateProcessFormDialogComponent;
  let fixture: ComponentFixture<CreateProcessFormDialogComponent>;
  let mockBuilder: any;
  let matDialogSpy: any;
  let mockService: any;

  const dummyAccountant: IAccountant = {
    address: "address sample",
    email: "john.doe@test.com",
    id: "accountant-id",
    name: "accountant-name",
    phone: "09999999"
  };

  const dummySubprocess: ISubprocess = {
    accountant: dummyAccountant,
    description: "subprocess description",
    id: "subprocess-id",
    name: "subprocess name",
    processId: "parent-process-id"
  }

  const dummyProcess: IProcess = {
    id: "process-id",
    name: "process-name",
    subprocess: dummySubprocess,
    version: "1"
  }

  const dummyData = {
    id: "id-sample",
    name: "John Doe",
    version: "1",
  };

  beforeEach(async () => {
    const mockForm = new FormGroup({
      ['id']: new FormControl(),
      ['name']: new FormControl(),
      ['version']: new FormControl(),
    });

    mockForm.patchValue({
      ['id']: "id-sample",
      ['name']: "John Doe",
      ['version']: "1",
    });

    mockBuilder = jasmine.createSpyObj('FormBuilder', ['group', 'control']);
    mockBuilder.group.and.returnValue(mockForm);
    mockBuilder.control.and.returnValue();

    matDialogSpy = jasmine.createSpyObj('MatDialog', ['closeAll']);
    matDialogSpy.closeAll.and.returnValue();

    mockService = jasmine.createSpyObj('ApiService', ['createProcess$', 'updateProcess$']);
    mockService.createProcess$.and.returnValue(of(dummyProcess));
    mockService.updateProcess$.and.returnValue(of(dummyProcess));

    await TestBed.configureTestingModule({
      declarations: [ CreateProcessFormDialogComponent ],
      providers: [
        {
          provide: FormBuilder,
          useValue: mockBuilder
        },
        {
          provide: MatDialog,
          useValue: matDialogSpy
        },
        {
          provide: ApiService,
          useValue: mockService,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: dummyData
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })

  });

  it("should initialize a 'CreateProcessFormDialogComponent' component successfully", () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(CreateProcessFormDialogComponent);
    component = fixture.componentInstance;
    const domElement: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(component).toBeDefined();
    expect(domElement.querySelectorAll('form').length).toEqual(1);
    expect(domElement.querySelectorAll('h2').length).toEqual(1);
    expect(domElement.querySelectorAll('mat-dialog-content').length).toEqual(1);
    expect(domElement.querySelectorAll('mat-dialog-actions').length).toEqual(1);
    expect(domElement.querySelectorAll('mat-form-field').length).toEqual(2);
    expect(domElement.querySelectorAll('input').length).toEqual(2);
    expect(domElement.querySelectorAll('button').length).toEqual(2);
  });

  it("should create a new process successfully", () =>{
    TestBed.overrideProvider(MAT_DIALOG_DATA, {useValue: {...dummyData, id: ""}});
    TestBed.compileComponents();
    fixture = TestBed.createComponent(CreateProcessFormDialogComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.save();
    expect(mockService.createProcess$).toHaveBeenCalled();
    expect(matDialogSpy.closeAll).toHaveBeenCalled();
    expect(mockService.updateProcess$).not.toHaveBeenCalled();
  });

  it("should update an existing process successfully", () =>{
    TestBed.compileComponents();
    fixture = TestBed.createComponent(CreateProcessFormDialogComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.save();
    expect(mockService.updateProcess$).toHaveBeenCalled();
    expect(mockService.createProcess$).not.toHaveBeenCalled();
    expect(matDialogSpy.closeAll).toHaveBeenCalled();
  });
});
