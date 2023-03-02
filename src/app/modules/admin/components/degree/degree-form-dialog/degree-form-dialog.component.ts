import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../../../../core/services/api/api.service";
import {MyErrorStateMatcher} from "../../process/create-subprocess-form-dialog/create-subprocess-form-dialog.component";
import {IProcess} from "../../../../../core/schema/process.schema";
import * as _ from "lodash";

@Component({
    selector: 'app-create-accountant-form-dialog',
    templateUrl: './degree-form-dialog.component.html',
    styleUrls: ['./degree-form-dialog.component.css']
})
export class DegreeFormDialogComponent implements OnInit {

    degreeForm: FormGroup;
    processes: IProcess[];
    matcher = new MyErrorStateMatcher();
    selected = new FormControl("", [Validators.required]);

    constructor(
        private builder: FormBuilder,
        private dialog: MatDialog,
        private api: ApiService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    ngOnInit(): void {
        console.log("DATA", this.data);

        this.api.getProcesses$().subscribe(resp => {
            this.processes = resp
        })

        this.degreeForm = this.builder.group({
            id: this.builder.control({disabled: true}),
            name: this.builder.control("", [Validators.required]),
            processes: this.builder.control("", [Validators.required])
        });

        if (this.data.id != "" && this.data.id != null) {
            this.degreeForm.setValue({
                id: this.data.id,
                name: this.data.name,
                processes: this.data.processes,
            })
        }
    }

    save() {
        if (this.degreeForm.valid) {
            const editId: string = _.get(this.data, "id", "");
            if (editId != "" && editId != null) {
                this.api.updateDegree$(editId, this.degreeForm.value).subscribe()
            } else {
                this.api.createDegree$(this.degreeForm.value).subscribe()
            }
            this.closeDialog()
        }
    }

    closeDialog() {
        this.dialog.closeAll();
    }

}
