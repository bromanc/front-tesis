import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../../../../core/services/api/api.service";
import * as _ from "lodash";

@Component({
    selector: 'app-create-process-accountant-form-dialog',
    templateUrl: './create-process-form-dialog.component.html',
    styleUrls: ['./create-process-form-dialog.component.css']
})
export class CreateProcessFormDialogComponent implements OnInit {

    constructor(
        private builder: FormBuilder,
        private dialog: MatDialog,
        private api: ApiService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    processForm: FormGroup;

    ngOnInit(): void {
        this.processForm = this.builder.group({
            id: this.builder.control({disabled: true}),
            name: this.builder.control("", [Validators.required]),
            version: this.builder.control("", [Validators.required])
        })

        if (this.data.id != '' && this.data.id != null) {
            this.processForm.setValue({
                id: this.data.id,
                name: this.data.name,
                version: this.data.version,
            });
        }
    }

    save() {
        if (this.processForm.valid) {
            const editId: string = _.get(this.data, "id", "");
            if (editId != "" && editId != null) {
                this.api.updateProcess$(editId, this.processForm.value)
                    .subscribe(resp => console.log(resp))
            } else {
                this.api.createProcess$(this.processForm.value)
                    .subscribe(resp => console.log(resp))
            }
            this.closeDialog()
        }
    }

    closeDialog() {
        this.dialog.closeAll();
    }

}
