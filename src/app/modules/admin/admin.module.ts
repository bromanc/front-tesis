import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminSidenavComponent} from './components/sidenav/admin-sidenav.component';
import {MaterialModule} from "../../core/material/material.module";
import {AccountantComponent} from './components/accountant/accountant.component';
import {ProcessComponent} from './components/process/process.component';
import {DegreeComponent} from './components/degree/degree.component';
import {StudentComponent} from './components/student/student.component';
import {AccountantFormDialogComponent} from './components/accountant/accountant-form-dialog/accountant-form-dialog.component';
import {CreateProcessFormDialogComponent} from './components/process/create-process-form-dialog/create-process-form-dialog.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SubprocessFormDialogComponent} from './components/process/subprocess-form-dialog/subprocess-form-dialog.component';
import {CreateSubprocessFormDialogComponent} from './components/process/create-subprocess-form-dialog/create-subprocess-form-dialog.component';
import {DegreeFormDialogComponent} from './components/degree/degree-form-dialog/degree-form-dialog.component';
import { StudentFormDialogComponent } from './components/student/student-form-dialog/student-form-dialog.component';
import { StudentDegreeFormDialogComponent } from './components/student/student-degree-form-dialog/student-degree-form-dialog.component';

@NgModule({
    declarations: [
        AdminSidenavComponent,
        AccountantComponent,
        ProcessComponent,
        DegreeComponent,
        StudentComponent,
        AccountantFormDialogComponent,
        CreateProcessFormDialogComponent,
        SubprocessFormDialogComponent,
        CreateSubprocessFormDialogComponent,
        DegreeFormDialogComponent,
        StudentFormDialogComponent,
        StudentDegreeFormDialogComponent,
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class AdminModule {
}
