import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {of} from 'rxjs';
import {IAccountant} from 'src/app/core/schema/accountant.schema';
import {ApiService} from 'src/app/core/services/api/api.service';
import {AccountantFormDialogComponent} from './accountant-form-dialog.component';

const dummyAccountant: IAccountant = {
    address: "address sample",
    email: "john.doe@test.com",
    id: "accountant-id",
    name: "accountant-name",
    phone: "09999999"
};

const dummyData = {
    id: "id-sample",
    name: "John Doe",
    phone: "0999999999",
    email: "john.doe@test.com",
    address: "address-sample",
};

describe('FormDialogComponent', () => {
    let component: AccountantFormDialogComponent;
    let fixture: ComponentFixture<AccountantFormDialogComponent>;
    let matDialogSpy: any;
    let mockBuilder: any;
    let mockService: any;

    beforeEach(async () => {
        matDialogSpy = jasmine.createSpyObj('MatDialog', ['closeAll'])
        matDialogSpy.closeAll.and.returnValue();

        mockService = jasmine.createSpyObj('ApiService', ['updateAccountant$', 'createAccountant$']);
        mockService.createAccountant$.and.returnValue(of(dummyAccountant));
        mockService.updateAccountant$.and.returnValue(of(dummyAccountant));

        const mockForm = new FormGroup({
            ['id']: new FormControl(),
            ['name']: new FormControl(),
            ['phone']: new FormControl(),
            ['email']: new FormControl(),
            ['address']: new FormControl(),
        });

        mockForm.patchValue({
            ['id']: "id-sample",
            ['name']: "John Doe",
            ['phone']: "0999999999",
            ['email']: "john.doe@test.com",
            ['address']: "address-sample",
        });

        mockBuilder = jasmine.createSpyObj('FormBuilder', ['group', 'control']);
        mockBuilder.group.and.returnValue(mockForm)
        mockBuilder.control.and.returnValue()


        await TestBed.configureTestingModule({
            declarations: [AccountantFormDialogComponent],
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
                }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
    });

    it("should initialize the 'AccountantFormDialogComponent' successfully", () => {
        TestBed.compileComponents();
        fixture = TestBed.createComponent(AccountantFormDialogComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        expect(component).toBeDefined();
        const domElement: HTMLElement = fixture.nativeElement as HTMLElement;
        expect(domElement.querySelectorAll('form').length).toEqual(1);
        expect(domElement.querySelectorAll('mat-form-field').length).toEqual(4);
        expect(domElement.querySelectorAll('mat-label').length).toEqual(4);
        expect(domElement.querySelectorAll('input').length).toEqual(4);
        expect(domElement.querySelectorAll('button').length).toEqual(2);
    });

    it("should close the dialog successfully", () => {
        TestBed.compileComponents();
        fixture = TestBed.createComponent(AccountantFormDialogComponent);
        component = fixture.componentInstance;
        component.closeDialog();
        expect(matDialogSpy.closeAll).toHaveBeenCalled();
    });

    it("should create a new accountant successfully", () => {
        TestBed.overrideProvider(MAT_DIALOG_DATA, {useValue: {...dummyData, id: ""}});
        TestBed.compileComponents();
        fixture = TestBed.createComponent(AccountantFormDialogComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        component.save();
        expect(mockService.createAccountant$).toHaveBeenCalled();
        expect(mockService.updateAccountant$).not.toHaveBeenCalled();
    });

    it("should update an existing accountant successfully", () => {
        TestBed.compileComponents();
        fixture = TestBed.createComponent(AccountantFormDialogComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        component.save();
        expect(mockService.createAccountant$).not.toHaveBeenCalled();
        expect(mockService.updateAccountant$).toHaveBeenCalled();
    });
});
