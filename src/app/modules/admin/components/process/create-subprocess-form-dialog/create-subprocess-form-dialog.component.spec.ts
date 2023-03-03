import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { IAccountant } from 'src/app/core/schema/accountant.schema';
import { ISubprocess } from 'src/app/core/schema/process.schema';
import { ApiService } from 'src/app/core/services/api/api.service';

import { CreateSubprocessFormDialogComponent, MyErrorStateMatcher } from './create-subprocess-form-dialog.component';

describe('CreateSubprocessFormDialogComponent', () => {
  let component: CreateSubprocessFormDialogComponent;
  let fixture: ComponentFixture<CreateSubprocessFormDialogComponent>;
  let matDialogSpy: any;
  let mockBuilder: any;
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
    description: "some subprocess",
    id: "subprocess-id",
    name: "subprocess name",
    processId: "process-id",
  };

  const dummyData = {
    accountant: { ...dummyAccountant, _id: "1234123412" },
    description: "some subprocess",
    id: "subprocess-id",
    name: "subprocess name",
    processId: "process-id",
  };

  beforeEach(async () => {
    matDialogSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialogSpy.close.and.returnValue();
    const mockForm = new FormGroup({
      ['id']: new FormControl(),
      ['name']: new FormControl(),
      ['accountant']: new FormControl(),
      ['description']: new FormControl(),
    });

    mockForm.patchValue({
      ['id']: "id-sample",
      ['name']: "John Doe",
      ['accountant']: dummyAccountant,
      ['description']: "description",
    });

    mockBuilder = jasmine.createSpyObj('FormBuilder', ['group', 'control']);
    mockBuilder.group.and.returnValue(mockForm);
    mockBuilder.control.and.returnValue();

    mockService = jasmine.createSpyObj('ApiService', ['getAccountants$', 'updateSubprocess$', 'createSubprocess$']);
    mockService.getAccountants$.and.returnValue(of([dummyAccountant, dummyAccountant]));
    mockService.updateSubprocess$.and.returnValue(of(dummySubprocess));
    mockService.createSubprocess$.and.returnValue(of(dummySubprocess));


    await TestBed.configureTestingModule({
      declarations: [CreateSubprocessFormDialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: matDialogSpy
        },
        {
          provide: FormBuilder,
          useValue: mockBuilder
        },
        {
          provide: ApiService,
          useValue: mockService
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: dummyData
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  it("should initialize a new 'CreateSubprocessFormDialogComponent' component sucessfully", () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(CreateSubprocessFormDialogComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    const domElement: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(component).toBeDefined();
    expect(domElement.querySelectorAll('form').length).toEqual(1);
    expect(domElement.querySelectorAll('h2').length).toEqual(1);
    expect(domElement.querySelectorAll('mat-dialog-content').length).toEqual(1);
    expect(domElement.querySelectorAll('mat-form-field').length).toEqual(3);
    expect(domElement.querySelectorAll('button').length).toEqual(2);
  });

  it("should create a new subprocess successfully", () => {
    TestBed.overrideProvider(MAT_DIALOG_DATA, { useValue: { ...dummyData, id: "" } });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(CreateSubprocessFormDialogComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.save();
    expect(matDialogSpy.close).toHaveBeenCalled();
    expect(mockService.createSubprocess$).toHaveBeenCalled();
    expect(mockService.updateSubprocess$).not.toHaveBeenCalled();
  });
  it("should update an existing subprocess successfully", () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(CreateSubprocessFormDialogComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.save();
    expect(matDialogSpy.close).toHaveBeenCalled();
    expect(mockService.updateSubprocess$).toHaveBeenCalled();
    expect(mockService.createSubprocess$).not.toHaveBeenCalled();
  });
});

describe("MyErrorStateMatcher", () => {

  it("should initialize a new 'MyErrorStateMatcher' sucessfully", () => {
    const errorMatcher = new MyErrorStateMatcher();
    const res = errorMatcher.isErrorState(null, null);
    expect(res).toBeFalse();
    expect(errorMatcher).toBeDefined();
  });
  it("should trigger the 'isErrorState' method sucessfully with non-null providers", () => {
    const mockFormControl = jasmine.createSpyObj('FormControl', {}, { invalid: true, dirty: true, submitted: true, touched: true });
    const mockForm = jasmine.createSpyObj('FormGroupDirective', {}, { submitted: true });
    const errorMatcher = new MyErrorStateMatcher();

    const res = errorMatcher.isErrorState(mockFormControl, mockForm);
    expect(errorMatcher).toBeDefined();
    expect(res).toBeTrue();
  });
  it("should trigger the 'isErrorState' method sucessfully with different providers", () => {
    const mockFormControl = jasmine.createSpyObj('FormControl', {}, { invalid: true, dirty: false, submitted: true, touched: true });
    const mockForm = jasmine.createSpyObj('FormGroupDirective', {}, { submitted: true });
    const errorMatcher = new MyErrorStateMatcher();

    const res = errorMatcher.isErrorState(mockFormControl, mockForm);
    expect(errorMatcher).toBeDefined();
    expect(res).toBeTrue();
  });

  it("should trigger the 'isErrorState' method sucessfully with a different form provider", () => {
    const mockFormControl = jasmine.createSpyObj('FormControl', {}, { invalid: true, dirty: false, submitted: true, touched: false });
    const mockForm = jasmine.createSpyObj('FormGroupDirective', {}, { submitted: true });
    const errorMatcher = new MyErrorStateMatcher();

    const res = errorMatcher.isErrorState(mockFormControl, mockForm);
    expect(errorMatcher).toBeDefined();
    expect(res).toBeTrue();
  });
});
