import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../../../core/services/api/api.service";
import {AccountantFormDialogComponent} from "./accountant-form-dialog/accountant-form-dialog.component";
import {IAccountant} from "../../../../core/schema/accountant.schema";
import {DataSource} from "@angular/cdk/collections";
import {Observable, ReplaySubject} from "rxjs";

@Component({
    selector: 'app-accountant',
    templateUrl: './accountant.component.html',
    styleUrls: ['./accountant.component.css']
})
export class AccountantComponent implements OnInit {

    constructor(
        public dialog: MatDialog,
        private api: ApiService,
        private changeDetectorRefs: ChangeDetectorRef
    ) {
    }

    isLoading: boolean;
    displayedColumns: string[] = ['name', 'email', 'address', 'actions'];
    dataSource: any;

    ngOnInit(): void {
        this.isLoading = false;
        this.api.getAccountants$().subscribe(
            resp => {
                this.isLoading = true;
                this.dataSource = new AccountantDataSource(resp);
            });
    }

    openDialog() {
        this.dialog.open(AccountantFormDialogComponent, {
            disableClose: true,
        }).afterClosed().subscribe(() => this.reloadDataSource().then());
    }

    editEntry(element: any): void {
        this.dialog.open(AccountantFormDialogComponent, {
            disableClose: true,
            data: {
                id: element.id,
                name: element.name,
                phone: element.phone,
                email: element.email,
                address: element.address,
            }
        }).afterClosed().subscribe(() => this.reloadDataSource().then());
    }

    deleteEntry(id: string) {
        this.api.deleteAccountant$(id).subscribe(() => this.reloadDataSource().then());
    }

    async reloadDataSource() {
        this.dataSource.setData(null);
        this.isLoading = false;
        await new Promise(f => setTimeout(f, 1000));
        this.api.getAccountants$().subscribe(
            resp => {
                this.isLoading = true;
                this.dataSource.setData(resp);
                this.changeDetectorRefs.detectChanges();
            })
    }
}

export class AccountantDataSource extends DataSource<IAccountant> {
    private _dataStream = new ReplaySubject<IAccountant[]>();

    constructor(initialData: IAccountant[]) {
        super();
        this.setData(initialData);
    }

    connect(): Observable<IAccountant[]> {
        return this._dataStream;
    }

    disconnect() {
    }

    setData(data: IAccountant[]) {
        this._dataStream.next(data);
    }
}
