import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IDegree} from "../../../../../core/schema/degree.schema";
import {
    MyErrorStateMatcher
} from "../../../../admin/components/process/create-subprocess-form-dialog/create-subprocess-form-dialog.component";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../../../../core/services/api/api.service";
import * as _ from "lodash";

@Component({
    selector: 'app-enrollment-degree-form',
    templateUrl: './enrollment-degree-form.component.html',
    styleUrls: ['./enrollment-degree-form.component.css']
})
export class EnrollmentDegreeFormComponent implements OnInit {

    enrollmentForm: FormGroup;
    degrees: IDegree[];
    processes: any;
    matcher = new MyErrorStateMatcher();
    selected = new FormControl("", [Validators.required])
    user_id: string;

    constructor(
        private dialog: MatDialog,
        private builder: FormBuilder,
        private api: ApiService,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    }

    ngOnInit(): void {
        this.user_id = _.get(this.data, "user_id", "");
        this.api.getDegrees$().subscribe(resp => this.degrees = resp);
        this.enrollmentForm = this.builder.group({
            name: this.builder.control({value: _.get(this.data, "name", ""), disabled: true}),
            degree: this.builder.control("", [Validators.required]),
            process: this.builder.control("", [Validators.required]),
        })
    }

    onDegreeSelected(degreeId: any) {
        if (degreeId) {
            this.api.getDegree$(degreeId).subscribe(resp => {
                this.processes = _.get(resp, "processes", []);
            })
        }
    }

    save() {
        if (this.enrollmentForm.valid) {
            this.api.assignDegreeToUser$(
                this.user_id,
                this.enrollmentForm.value.degree,
                this.enrollmentForm.value.process,
            ).subscribe();
            this.dialog.closeAll()
        }
    }
}
