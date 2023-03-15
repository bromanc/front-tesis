import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../../../core/services/api/api.service';
import { IDegree } from '../../../../core/schema/degree.schema';
import { IProcess } from '../../../../core/schema/process.schema';
import { DegreeComponent, DegreeDataSource } from './degree.component';

export class MockMatDialog {
  public afterClosed(): Observable<any> {
    return of(1);
  }
}

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

describe('DegreeComponent', () => {
  let component: DegreeComponent;
  let fixture: ComponentFixture<DegreeComponent>;
  let matDialogSpy: any;
  let mockApiService: any;
  let mockDetectorRefs: any;

  const dummyData = {
    id: "id-sample",
    name: "degree",
    processes: [dummyProcess]
  };

  beforeEach(async () => {
    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open'])
    matDialogSpy.open.and.returnValue(new MockMatDialog());

    mockApiService = jasmine.createSpyObj('ApiService', ['getDegrees$', 'deleteDegree$']);
    mockApiService.getDegrees$.and.returnValue(of([dummyDegree, dummyDegree]));
    mockApiService.deleteDegree$.and.returnValue(of(true));

    mockDetectorRefs = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
    mockDetectorRefs.detectChanges.and.returnValue();

    await TestBed.configureTestingModule({
      declarations: [DegreeComponent],
      providers: [
        {
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
        },
      ]
    })
        .compileComponents();

    fixture = TestBed.createComponent(DegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create and initialize an 'DegreeComponent' successfully", () => {
    component.ngOnInit();
    const domElement: HTMLElement = fixture.nativeElement as HTMLElement;

    expect(component).toBeDefined();
    expect(domElement.querySelectorAll('form').length).toEqual(1);
    expect(domElement.querySelectorAll('div').length).toEqual(3);
    expect(domElement.querySelectorAll('input').length).toEqual(1);
    expect(domElement.querySelectorAll('button').length).toEqual(1);
    expect(mockApiService.getDegrees$).toHaveBeenCalled();
  });

  it("should trigger the 'openDialog' method successfully", () => {
    component.openDialog();
    expect(matDialogSpy.open).toHaveBeenCalled();
  });

  it("should trigger the 'editEntry' method successfully", () => {
    component.editEntry(dummyData);
    expect(matDialogSpy.open).toHaveBeenCalled();
    expect(mockApiService.getDegrees$).toHaveBeenCalled();
  });

  it("should trigger the 'deleteEntry' method successfully", () => {
    component.deleteEntry("1234");
    expect(mockApiService.deleteDegree$).toHaveBeenCalled();
    expect(mockApiService.getDegrees$).toHaveBeenCalled();
  });

  it("should trigger the 'reloadDataSource' method successfully", async () => {
    await component.reloadDataSource();
    expect(mockApiService.getDegrees$).toHaveBeenCalled();
  });

});

describe("DegreeDataSource", () => {
  it("should initialize an DegreeDataSource object successfully", () => {
    const degreeDataSource = new DegreeDataSource([dummyDegree]);
    expect(degreeDataSource).toBeDefined();
  })

  it("should trigger the 'connect' and 'disconnect' methods successfully", () => {
    const degreeDataSource = new DegreeDataSource([dummyDegree]);
    const connectResult = degreeDataSource.connect();
    degreeDataSource.disconnect();
    expect(degreeDataSource).toBeDefined();
    expect(connectResult).toBeDefined();
  })
});
