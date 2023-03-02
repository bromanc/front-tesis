import {ChangeDetectorRef, NO_ERRORS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatDialog} from '@angular/material/dialog';
import {Observable, of} from 'rxjs';
import {IAccountant} from 'src/app/core/schema/accountant.schema';
import {ApiService} from 'src/app/core/services/api/api.service';
import {AccountantComponent, AccountantDataSource} from './accountant.component';

export class MockMatDialog {
    public afterClosed(): Observable<any> {
        return of(1);
    }
}

const dummyAccountant: IAccountant = {
    address: "address sample",
    email: "john.doe@test.com",
    id: "accountant-id",
    name: "accountant-name",
    phone: "09999999"
};


describe('AccountantComponent', () => {
    let component: AccountantComponent;
    let fixture: ComponentFixture<AccountantComponent>;
    let mockApiService: any;
    let matDialogSpy: any;
    let mockDetectorRefs: any;
    const dummyData = {
        id: "id-sample",
        name: "John Doe",
        phone: "0999999999",
        email: "john.doe@test.com",
        address: "address-sample",
    };

    beforeEach(async () => {
        mockApiService = jasmine.createSpyObj('ApiService', ['getAccountants$', 'deleteAccountant$']);
        mockApiService.getAccountants$.and.returnValue(of([dummyAccountant, dummyAccountant]));
        mockApiService.deleteAccountant$.and.returnValue(of(true));
        matDialogSpy = jasmine.createSpyObj('MatDialog', ['open'])
        matDialogSpy.open.and.returnValue(new MockMatDialog());
        mockDetectorRefs = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
        mockDetectorRefs.detectChanges.and.returnValue();

        await TestBed.configureTestingModule({
            declarations: [AccountantComponent],
            providers: [
                {
                    provide: ApiService,
                    useValue: mockApiService,
                },
                {
                    provide: MatDialog,
                    useValue: matDialogSpy,
                },
                {
                    provide: ChangeDetectorRef,
                    useValue: mockDetectorRefs,
                },
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AccountantComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create and initialize an 'AccountantComponent' successfully", () => {
        component.ngOnInit();
        const domElement: HTMLElement = fixture.nativeElement as HTMLElement;

        expect(component).toBeTruthy();
        expect(domElement.querySelectorAll('form').length).toEqual(1);
        expect(domElement.querySelectorAll('div').length).toEqual(3);
        expect(domElement.querySelectorAll('input').length).toEqual(1);
        expect(domElement.querySelectorAll('button').length).toEqual(1);
        expect(mockApiService.getAccountants$).toHaveBeenCalled();
    });

    it("should trigger the 'openDialog' method successfully", () => {
        component.openDialog();
        expect(matDialogSpy.open).toHaveBeenCalled();
    });

    it("should trigger the 'editEntry' method successfully", () => {
        component.editEntry(dummyData);
        expect(matDialogSpy.open).toHaveBeenCalled();
        expect(mockApiService.getAccountants$).toHaveBeenCalled();
    });

    it("should trigger the 'deleteEntry' method successfully", () => {
        component.deleteEntry("1234");
        expect(mockApiService.deleteAccountant$).toHaveBeenCalled();
        expect(mockApiService.getAccountants$).toHaveBeenCalled();
    });

    it("should trigger the 'reloadDataSource' method successfully", async () => {
        await component.reloadDataSource();
        expect(mockApiService.getAccountants$).toHaveBeenCalled();
    });
});

describe("AccountantDataSource", () => {

    it("should initialize an AccountantDataSource object successfully", () => {
        const accountantDataSource = new AccountantDataSource([dummyAccountant]);
        expect(accountantDataSource).toBeDefined();
    })

    it("should trigger the 'connect' and 'disconnect' methods successfully", () => {
        const accountantDataSource = new AccountantDataSource([dummyAccountant]);
        const connectResult = accountantDataSource.connect();
        accountantDataSource.disconnect();
        expect(accountantDataSource).toBeDefined();
        expect(connectResult).toBeDefined();
    })
})
