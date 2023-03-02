import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ApiService} from "../../../../../core/services/api/api.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
    selector: 'app-subprocess-degree-form',
    templateUrl: './subprocess-degree-form.component.html',
    styleUrls: ['./subprocess-degree-form.component.css']
})
export class SubprocessDegreeFormComponent implements OnInit {

    subprocessForm: FormGroup;

    constructor(
        private builder: FormBuilder,
        private api: ApiService,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    }

    ngOnInit(): void {
        this.subprocessForm = this.builder.group({
            name: this.builder.control({value: this.data.name, disabled: true}),
            accountant: this.builder.control({value: this.data.accountant.name, disabled: true}),
            description: this.builder.control({value: this.data.description, disabled: true}),
        })
    }

}
