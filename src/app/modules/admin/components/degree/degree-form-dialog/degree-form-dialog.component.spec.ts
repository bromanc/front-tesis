import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { IDegree } from '../../../../../core/schema/degree.schema';
import { IProcess } from '../../../../../core/schema/process.schema';
import { ApiService } from '../../../../../core/services/api/api.service';

import { DegreeFormDialogComponent } from './degree-form-dialog.component';

describe('CreateFormDialogComponent', () => {
  let component: DegreeFormDialogComponent;
  let fixture: ComponentFixture<DegreeFormDialogComponent>;
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

  const dummyData = {
    id: "id-sample",
    name: "John Doe",
    phone: "0999999999",
    email: "john.doe@test.com",
    address: "address-sample",
    processes: "123"
  };

  beforeEach(async () => {
    const mockForm = new FormGroup({
      ['id']: new FormControl(),
      ['name']: new FormControl(),
      ['processes']: new FormControl(),
    });

    mockForm.patchValue({
      ['id']: "id-sample",
      ['name']: "John Doe",
      ['processes']: "0999999999",
    });

    mockBuilder = jasmine.createSpyObj('FormBuilder', ['group', 'control']);
    mockBuilder.group.and.returnValue(mockForm);
    mockBuilder.control.and.returnValue();

    matDialogSpy = jasmine.createSpyObj('MatDialog', ['closeAll'])
    matDialogSpy.closeAll.and.returnValue();

    mockService = jasmine.createSpyObj('ApiService', ['getProcesses$', 'updateDegree$', 'createDegree$']);
    mockService.getProcesses$.and.returnValue(of([dummyProcess]));
    mockService.updateDegree$.and.returnValue(of(dummyDegree));
    mockService.createDegree$.and.returnValue(of(dummyDegree));

    await TestBed.configureTestingModule({
      declarations: [DegreeFormDialogComponent],
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

  it("should initialize the 'DegreeFormDialogComponent' successfully", () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(DegreeFormDialogComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    expect(component).toBeDefined();
    const domElement: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(domElement.querySelectorAll('form').length).toEqual(1);
    expect(domElement.querySelectorAll('mat-form-field').length).toEqual(2);
    expect(domElement.querySelectorAll('mat-label').length).toEqual(2);
    expect(domElement.querySelectorAll('input').length).toEqual(1);
    expect(domElement.querySelectorAll('button').length).toEqual(2);
  });

  it("should close the dialog successfully", () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(DegreeFormDialogComponent);
    component = fixture.componentInstance;
    component.closeDialog();
    expect(matDialogSpy.closeAll).toHaveBeenCalled();
  });

  it("should create a new degree successfully", () => {
    TestBed.overrideProvider(MAT_DIALOG_DATA, { useValue: { ...dummyData, id: "" } });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(DegreeFormDialogComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.save();
    expect(mockService.createDegree$).toHaveBeenCalled();
    expect(mockService.updateDegree$).not.toHaveBeenCalled();
  });

  it("should update an existing degree successfully", () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(DegreeFormDialogComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.save();
    expect(mockService.createDegree$).not.toHaveBeenCalled();
    expect(mockService.updateDegree$).toHaveBeenCalled();
  });
});
