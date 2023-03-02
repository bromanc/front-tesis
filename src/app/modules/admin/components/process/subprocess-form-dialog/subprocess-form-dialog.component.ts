import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../../../../core/services/api/api.service";
import {ISubprocess} from "../../../../../core/schema/process.schema";
import {
    CreateSubprocessFormDialogComponent
} from "../create-subprocess-form-dialog/create-subprocess-form-dialog.component";
import {DataSource} from "@angular/cdk/collections";
import {Observable, ReplaySubject} from "rxjs";
import * as _ from "lodash";

@Component({
    selector: 'app-subprocess-accountant-form-dialog',
    templateUrl: './subprocess-form-dialog.component.html',
    styleUrls: ['./subprocess-form-dialog.component.css'],
})
export class SubprocessFormDialogComponent implements OnInit {

    constructor(
        private dialog: MatDialog,
        private api: ApiService,
        private changeDetectorRefs: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    }

    isLoading: boolean;
    displayedColumns = ['name', 'accountant', 'actions'];
    dataSource: any;
    processId: string;

    ngOnInit(): void {
        this.isLoading = false;
        this.processId = _.get(this.data, "id", "");
        this.api.getSubprocessesByProcessId$(this.processId).subscribe(
            resp => {
                this.isLoading = true;
                this.dataSource = new SubprocessDataSource(resp);
            }
        );
    }


    openAddSubprocessDialog() {
        this.dialog.open(CreateSubprocessFormDialogComponent, {
            disableClose: true,
            data: {
                processId: this.processId,
            }
        })
            .afterClosed()
            .subscribe(() => this.reloadDataSource().then());
    }

    editEntry(subprocess: any) {
        this.dialog.open(CreateSubprocessFormDialogComponent, {
            disableClose: true,
            data: {
                id: subprocess.id,
                name: subprocess.name,
                accountant: subprocess.accountant,
                description: subprocess.description,
                processId: this.processId,
            }
        })
            .afterClosed()
            .subscribe(() => this.reloadDataSource().then());
    }

    deleteEntry(subprocessId: string) {
        this.api.deleteSubprocess$(subprocessId)
            .subscribe(() => this.reloadDataSource().then());
    }

    async reloadDataSource() {
        this.dataSource.setData(null);
        this.isLoading = false;
        await new Promise(f => setTimeout(f, 1000));
        this.api.getSubprocessesByProcessId$(this.processId).subscribe(
            resp => {
                this.isLoading = true;
                this.dataSource.setData(resp);
                this.changeDetectorRefs.detectChanges();
            }
        )
    }
}

export class SubprocessDataSource extends DataSource<ISubprocess> {
    private _dataStream = new ReplaySubject<ISubprocess[]>();

    constructor(initialData: ISubprocess[]) {
        super();
        this.setData(initialData);
    }

    connect(): Observable<ISubprocess[]> {
        return this._dataStream;
    }

    disconnect() {
    }

    setData(data: ISubprocess[]) {
        this._dataStream.next(data);
    }
}
