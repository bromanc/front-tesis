import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormDialogComponent} from "./forms/create/form-dialog.component";
import {ApiService} from "../../core/services/api/api.service";
import {MatTableDataSource} from "@angular/material/table";
import {IAccountant} from "../../core/schema/accountant.schema";

@Component({
    selector: 'app-accountant',
    templateUrl: './accountant.component.html',
    styleUrls: ['./accountant.component.css']
})
export class AccountantComponent implements OnInit {

    constructor(
        public dialog: MatDialog,
        private api: ApiService,
    ) {
    }

    ngOnInit(): void {
        this.api.getAccountants$().subscribe(resp => this.dataSource = new MatTableDataSource<IAccountant>(resp))
    }

    displayedColumns: string[] = ['name', 'email', 'address', 'actions'];
    dataSource: any;

    openDialog() {
        const dialogRef = this.dialog.open(FormDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }
}
