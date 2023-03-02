import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ApiService} from "../../../../core/services/api/api.service";
import {DataSource} from "@angular/cdk/collections";
import {IUser} from "../../../../core/schema/user.schema";
import {Observable, ReplaySubject} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {StudentFormDialogComponent} from "./student-form-dialog/student-form-dialog.component";
import {StudentDegreeFormDialogComponent} from "./student-degree-form-dialog/student-degree-form-dialog.component";

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

    constructor(
        public dialog: MatDialog,
        private api: ApiService,
        private changeDetectorRefs: ChangeDetectorRef,
    ) {
    }

    isLoading: boolean;

    displayedColumns: string[] = ['name', 'email', 'logins', 'actions'];

    dataSource: any;

    ngOnInit(): void {
        this.isLoading = false;
        this.api.getUsers$().subscribe(resp => {
            this.isLoading = true;
            this.dataSource = new UsersDataSource(resp);
        });
    }

    openDialog() {
        this.dialog.open(StudentFormDialogComponent, {
            disableClose: true,
        }).afterClosed().subscribe(() => this.reloadDataSource().then())
    }

    openDegree(user: any) {
        this.dialog.open(StudentDegreeFormDialogComponent, {
            disableClose: true,
            data: {
                user_id: user.user_id,
                name: user.name,
            }
        }).afterClosed().subscribe(() => this.reloadDataSource().then())
    }

    deleteUser(id: string) {
        this.api.deleteUser$(id).subscribe(() => this.reloadDataSource().then());
    }

    async reloadDataSource() {
        this.dataSource.setData(null);
        this.isLoading = false;
        await new Promise(f => setTimeout(f, 1000));
        this.api.getUsers$().subscribe(resp => {
            this.isLoading = true;
            this.dataSource.setData(resp);
            this.changeDetectorRefs.detectChanges();
        })
    }

}

export class UsersDataSource extends DataSource<IUser> {
    private _dataStream = new ReplaySubject<IUser[]>();

    constructor(initialData: IUser[]) {
        super();
        this.setData(initialData)
    }

    connect(): Observable<IUser[]> {
        return this._dataStream;
    }

    disconnect() {
    }

    setData(data: IUser[]) {
        this._dataStream.next(data);
    }
}
