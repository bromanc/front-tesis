import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentSidenavComponent} from './components/sidenav/student-sidenav.component';
import {MaterialModule} from "../../core/material/material.module";
import {StudentRoutingModule} from "./student-routing.module";
import {ProcessComponent} from './components/process/process.component';
import {ReactiveFormsModule} from "@angular/forms";
import { EnrollmentDegreeFormComponent } from './components/process/enrollment-degree-form/enrollment-degree-form.component';
import { SubprocessDegreeFormComponent } from './components/process/subprocess-degree-form/subprocess-degree-form.component';


@NgModule({
    declarations: [
        StudentSidenavComponent,
        ProcessComponent,
        EnrollmentDegreeFormComponent,
        SubprocessDegreeFormComponent
    ],
    imports: [
        CommonModule,
        StudentRoutingModule,
        ReactiveFormsModule,
        MaterialModule,
    ]
})
export class StudentModule {
}
