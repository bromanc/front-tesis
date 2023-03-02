import {Component, Inject, OnInit} from '@angular/core';
import {MyErrorStateMatcher} from "../../process/create-subprocess-form-dialog/create-subprocess-form-dialog.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IDegree} from "../../../../../core/schema/degree.schema";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../../../../core/services/api/api.service";
import * as _ from "lodash";

@Component({
    selector: 'app-student-degree-form-dialog',
    templateUrl: './student-degree-form-dialog.component.html',
    styleUrls: ['./student-degree-form-dialog.component.css']
})
export class StudentDegreeFormDialogComponent implements OnInit {

    studentDegreeForm: FormGroup;
    degrees: IDegree[];
    processes: any;
    matcher = new MyErrorStateMatcher();
    selected = new FormControl("", [Validators.required]);
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
        this.studentDegreeForm = this.builder.group({
            name: this.builder.control({value: _.get(this.data, "name", ""), disabled: true}),
            degree: this.builder.control("", [Validators.required]),
            process: this.builder.control("", [Validators.required]),
        });
        this.api.getUser$(this.user_id).subscribe(resp => {
            if (_.has(resp, "management")) {
                this.onDegreeSelected(_.get(resp.management, "degree._id", []))
                this.studentDegreeForm.disable();
                this.studentDegreeForm.setValue({
                    name: _.get(resp, "name", ""),
                    degree: _.get(resp.management, "degree._id", ""),
                    process: _.get(resp.management, "process._id", ""),
                })
            }
        });
    }

    onDegreeSelected(degreeId: any) {
        if (degreeId) {
            this.api.getDegree$(degreeId).subscribe(resp => {
                this.processes = _.get(resp, "processes", []);
            })
        }
    }

    save() {
        if (this.studentDegreeForm.valid) {
            this.api.assignDegreeToUser$(
                this.user_id,
                this.studentDegreeForm.value.degree,
                this.studentDegreeForm.value.process,
            ).subscribe();
            this.dialog.closeAll()
        }
    }
}
