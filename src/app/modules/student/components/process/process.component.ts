import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ApiService} from "../../../../core/services/api/api.service";
import {AuthService} from "@auth0/auth0-angular";
import * as _ from "lodash";
import {MatDialog} from "@angular/material/dialog";
import {EnrollmentDegreeFormComponent} from "./enrollment-degree-form/enrollment-degree-form.component";
import {
    SubprocessDataSource
} from "../../../admin/components/process/subprocess-form-dialog/subprocess-form-dialog.component";
import {SubprocessDegreeFormComponent} from "./subprocess-degree-form/subprocess-degree-form.component";

@Component({
    selector: 'app-process',
    templateUrl: './process.component.html',
    styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {

    processForm: FormGroup;
    user: any;
    isLoading: boolean;
    control: boolean = false;
    dataSource: any;
    displayedColumns = ['name', 'accountant', 'actions'];

    constructor(
        private builder: FormBuilder,
        private api: ApiService,
        private dialog: MatDialog,
        private authService: AuthService
    ) {
    }

    ngOnInit(): void {
        this.authService.user$.subscribe(authResponse => {
            const user_id = _.get(authResponse, "sub", "")
            this.api.getUser$(user_id).subscribe(async userResp => {
                this.user = userResp;
                this.processForm = this.builder.group({
                    name: this.builder.control({value: _.get(this.user, "name", ""), disabled: true}),
                    email: this.builder.control({value: _.get(this.user, "email", ""), disabled: true}),
                    degree: this.builder.control({
                        value: _.get(this.user.management, "degree.name", "No disponible"),
                        disabled: true
                    }),
                    process: this.builder.control({
                        value: _.get(this.user.management, "process.name", "No disponible"),
                        disabled: true
                    })
                })
                const processId = _.get(this.user.management, "process._id", "");
                this.isLoading = false;
                if (processId != "") {
                    this.api.getSubprocessesByProcessId$(processId).subscribe(
                        resp => {
                            this.isLoading = true;
                            this.dataSource = new SubprocessDataSource(resp);
                        }
                    );
                }


                if (!_.has(this.user, "management") && this.control) {
                    this.dialog.open(EnrollmentDegreeFormComponent, {
                        disableClose: true,
                        data: {
                            "user_id": user_id,
                            "name": _.get(userResp, "name", ""),
                        }
                    }).afterClosed().subscribe(async _ => {
                        await new Promise(f => setTimeout(f, 1500));
                        this.ngOnInit()
                    })
                }
                this.control = true;
            });
        });
    }

    openEntry(subprocess: any) {
        this.dialog.open(SubprocessDegreeFormComponent, {
            data: {
                id: subprocess.id,
                name: subprocess.name,
                accountant: subprocess.accountant,
                description: subprocess.description,
            }
        })
    }

}
