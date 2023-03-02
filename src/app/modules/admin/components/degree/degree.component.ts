import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DataSource} from "@angular/cdk/collections";
import {IDegree} from "../../../../core/schema/degree.schema";
import {Observable, ReplaySubject} from "rxjs";
import {ApiService} from "../../../../core/services/api/api.service";
import {MatDialog} from "@angular/material/dialog";
import {DegreeFormDialogComponent} from "./degree-form-dialog/degree-form-dialog.component";

@Component({
    selector: 'app-degree',
    templateUrl: './degree.component.html',
    styleUrls: ['./degree.component.css']
})
export class DegreeComponent implements OnInit {

    constructor(
        public dialog: MatDialog,
        private api: ApiService,
        private changeDetectorRefs: ChangeDetectorRef
    ) {
    }

    isLoading: boolean;
    displayedColumns: string[] = ['name', 'actions'];
    dataSource: any;

    ngOnInit(): void {
        this.isLoading = false;
        this.api.getDegrees$().subscribe(
            resp => {
                this.isLoading = true;
                this.dataSource = new DegreeDataSource(resp);
            }
        )
    }

    openDialog() {
        this.dialog.open(DegreeFormDialogComponent, {
            disableClose: true,
        }).afterClosed().subscribe(() => this.reloadDataSource().then())
    }

    editEntry(element: any): void {
        this.dialog.open(DegreeFormDialogComponent, {
            disableClose: true,
            data: {
                id: element.id,
                name: element.name,
                processes: element.processes,
            }
        }).afterClosed().subscribe(() => this.reloadDataSource().then())
    }

    deleteEntry(id: string) {
        this.api.deleteDegree$(id).subscribe(() => this.reloadDataSource().then());
    }


    async reloadDataSource() {
        this.dataSource.setData(null);
        this.isLoading = false;
        await new Promise(f => setTimeout(f, 1000));
        this.api.getDegrees$().subscribe(
            resp => {
                this.isLoading = true;
                this.dataSource.setData(resp);
                this.changeDetectorRefs.detectChanges();
            })
    }

}

export class DegreeDataSource extends DataSource<IDegree> {
    private _dataStream = new ReplaySubject<IDegree[]>();

    constructor(initialData: IDegree[]) {
        super();
        this.setData(initialData);
    }

    connect(): Observable<IDegree[]> {
        return this._dataStream;
    }

    disconnect() {
    }

    setData(data: IDegree[]) {
        this._dataStream.next(data);
    }
}
