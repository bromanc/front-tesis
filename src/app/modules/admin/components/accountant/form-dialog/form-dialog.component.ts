import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../../../../core/services/api/api.service";

@Component({
    selector: 'app-form-dialog',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.css']
})
export class FormDialogComponent implements OnInit {
    accountantForm: FormGroup;

    constructor(
        private builder: FormBuilder,
        private dialog: MatDialog,
        private api: ApiService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    ngOnInit(): void {
        this.accountantForm = this.builder.group({
            id: this.builder.control({disabled: true}),
            name: this.builder.control("", [Validators.required]),
            phone: this.builder.control("", [Validators.required]),
            email: this.builder.control("", [Validators.required, Validators.email]),
            address: this.builder.control("", [Validators.required])
        })

        if (this.data.id != '' && this.data.id != null) {
            this.accountantForm.setValue({
                id: this.data.id,
                name: this.data.name,
                phone: this.data.phone,
                email: this.data.email,
                address: this.data.address,
            });
        }
    }

    save() {
        if (this.accountantForm.valid) {
            const editId = this.accountantForm.getRawValue().id;
            if (editId != "" && editId != null) {
                this.api.updateAccountant$(editId, this.accountantForm.value)
                    .subscribe(resp => console.log(resp))
            } else {
                this.api.createAccountant$(this.accountantForm.value)
                    .subscribe(resp => console.log(resp))
            }
            this.closeDialog()
        }
    }

    closeDialog() {
        this.dialog.closeAll();
    }
}
