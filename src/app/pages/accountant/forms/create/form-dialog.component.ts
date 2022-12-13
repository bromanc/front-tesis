import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../../../core/services/api/api.service";

@Component({
    selector: 'app-create',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.css']
})
export class FormDialogComponent implements OnInit {
    editData: any;

    constructor(
        private builder: FormBuilder,
        private dialog: MatDialog,
        private api: ApiService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    ngOnInit(): void {
        if (this.data.id != '' && this.data.id != null) {
            this.api.getAccountantById$(this.data.id).subscribe(response => {
                this.editData = response;
                this.accountantForm.setValue({
                    name: this.editData.name,
                    phone: this.editData.phone,
                    email: this.editData.email,
                    address: this.editData.address,
                });
            });
        }
    }

    accountantForm = this.builder.group({
        name: this.builder.control("", [Validators.required]),
        phone: this.builder.control("", [Validators.required]),
        email: this.builder.control("", [Validators.required, Validators.email]),
        address: this.builder.control("", [Validators.required])
    })

    save() {
        if (this.accountantForm.valid) {
            const editId = "";//this.accountantForm.getRawValue().id;
            if (editId != "" && editId != null) {
                //this.api.createAccountant$()
            } else {
                this.closeDialog()
                this.api.createAccountant$(this.accountantForm.value)
                    .subscribe(resp => {
                        console.log(resp);
                    })
            }
        }
    }

    closeDialog() {
        this.dialog.closeAll();
    }

}
