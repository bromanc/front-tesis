import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../../../../core/services/api/api.service";

@Component({
    selector: 'app-student-form-dialog',
    templateUrl: './student-form-dialog.component.html',
    styleUrls: ['./student-form-dialog.component.css']
})
export class StudentFormDialogComponent implements OnInit {


    studentForm: FormGroup;

    constructor(
        private builder: FormBuilder,
        private dialog: MatDialog,
        private api: ApiService,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    }

    ngOnInit(): void {
        this.studentForm = this.builder.group({
            name: this.builder.control("", [Validators.required]),
            email: this.builder.control("", [Validators.required, Validators.email])
        })
    }

    save() {
        if (this.studentForm.valid) {
            this.api.createUser$(this.studentForm.value).subscribe();
            this.dialog.closeAll();
        }
    }
}
