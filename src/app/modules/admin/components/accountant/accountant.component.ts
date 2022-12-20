import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../../../core/services/api/api.service";
import {MatTableDataSource} from "@angular/material/table";
import {FormDialogComponent} from "./form-dialog/form-dialog.component";
import {IAccountant} from "../../../../core/schema/accountant.schema";

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

    isLoading = true;

    ngOnInit(): void {
        this.api.getAccountants$().subscribe(
            resp => {
                this.isLoading = false;
                this.dataSource = new MatTableDataSource<IAccountant>(resp)
            })
    }

    displayedColumns: string[] = ['name', 'email', 'address', 'actions'];
    dataSource: any;

    openDialog() {
        const dialogRef = this.dialog.open(FormDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    editEntry(element: any): void {
        const dialogRef = this.dialog.open(FormDialogComponent, {
            data: {
                id: element.id,
                name: element.name,
                phone: element.phone,
                email: element.email,
                address: element.address,
            }
        });
    }

    deleteEntry(id: string) {
        this.api.deleteAccountant$(id).subscribe()
    }
}
