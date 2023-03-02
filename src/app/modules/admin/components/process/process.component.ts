import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../../../core/services/api/api.service";
import {IProcess} from "../../../../core/schema/process.schema";
import {CreateProcessFormDialogComponent} from "./create-process-form-dialog/create-process-form-dialog.component";
import {SubprocessFormDialogComponent} from "./subprocess-form-dialog/subprocess-form-dialog.component";
import {DataSource} from "@angular/cdk/collections";
import {Observable, ReplaySubject} from "rxjs";

@Component({
    selector: 'app-process',
    templateUrl: './process.component.html',
    styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {

    constructor(
        public dialog: MatDialog,
        private api: ApiService,
        private changeDetectorRefs: ChangeDetectorRef
    ) {
    }

    isLoading: boolean;
    displayedColumns: string[] = ['name', 'version', 'actions'];
    dataSource: any;

    ngOnInit(): void {
        this.isLoading = false;
        this.api.getProcesses$().subscribe(
            resp => {
                this.isLoading = true;
                this.dataSource = new ProcessDataSource(resp);
            }
        );
    }

    openCreateProcessDialog() {
        this.dialog.open(CreateProcessFormDialogComponent, {
            disableClose: true,
        })
            .afterClosed()
            .subscribe(() => this.reloadDataSource().then());
    }

    openCreateSubprocessDialog(id: string) {
        this.api.getProcessById$(id).subscribe(data => {
            this.dialog.open(SubprocessFormDialogComponent, {
                data: {
                    id: data.id,
                    name: data.name,
                }
            })
                .afterClosed()
                .subscribe(() => this.reloadDataSource().then());
        });
    }

    editEntry(element: any) {
        this.dialog.open(CreateProcessFormDialogComponent, {
            data: {
                id: element.id,
                name: element.name,
                version: element.version,
            }
        })
            .afterClosed()
            .subscribe(() => this.reloadDataSource().then());
    }

    deleteEntry(processId: string) {
        this.api.deleteProcess$(processId)
            .subscribe(() => this.reloadDataSource().then());
    }

    async reloadDataSource() {
        this.dataSource.setData(null);
        this.isLoading = false;
        await new Promise(f => setTimeout(f, 1000));
        this.api.getProcesses$().subscribe(
            resp => {
                this.isLoading = true;
                this.dataSource.setData(resp);
                this.changeDetectorRefs.detectChanges();
            }
        )
    }
}

class ProcessDataSource extends DataSource<IProcess> {
    private _dataStream = new ReplaySubject<IProcess[]>();

    constructor(initialData: IProcess[]) {
        super();
        this.setData(initialData);
    }

    connect(): Observable<IProcess[]> {
        return this._dataStream;
    }

    disconnect() {
    }

    setData(data: IProcess[]) {
        this._dataStream.next(data);
    }
}
