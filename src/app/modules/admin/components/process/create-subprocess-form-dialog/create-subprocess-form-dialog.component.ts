import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../../../../core/services/api/api.service";
import {IAccountant} from "../../../../../core/schema/accountant.schema";
import {ErrorStateMatcher} from "@angular/material/core";
import * as _ from "lodash";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-create-subprocess-accountant-form-dialog',
    templateUrl: './create-subprocess-form-dialog.component.html',
    styleUrls: ['./create-subprocess-form-dialog.component.css']
})
export class CreateSubprocessFormDialogComponent implements OnInit {

    subprocessForm: FormGroup;
    accountants: IAccountant[];
    matcher = new MyErrorStateMatcher();
    selected = new FormControl("", [Validators.required]);
    processId: string;

    constructor(
        public dialogRef: MatDialogRef<CreateSubprocessFormDialogComponent>,
        private builder: FormBuilder,
        private api: ApiService,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    }

    ngOnInit(): void {
        this.processId = _.get(this.data, "processId", "");

        this.api.getAccountants$().subscribe(resp => {
            this.accountants = resp;
        });

        this.subprocessForm = this.builder.group({
            id: this.builder.control({disabled: true}),
            name: this.builder.control("", [Validators.required]),
            accountant: this.builder.control("", [Validators.required]),
            description: this.builder.control("", [Validators.required])
        });

        if (this.data.id != '' && this.data.id != null) {
            this.subprocessForm.setValue({
                id: this.data.id,
                name: this.data.name,
                accountant: this.data.accountant._id,
                description: this.data.description,
            })
        }
    }


    save() {
        if (this.subprocessForm.valid) {
            const editId: string = _.get(this.data, "id", "");
            if (editId != "" && editId != null){
                this.api.updateSubprocess$(editId, this.subprocessForm.value).subscribe();
            }  else {
                this.api.createSubprocess$(this.processId, this.subprocessForm.value).subscribe();
            }
            this.dialogRef.close();
        }
    }
}
