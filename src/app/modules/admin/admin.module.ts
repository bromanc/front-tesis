import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {MaterialModule} from "../../core/material/material.module";
import { AccountantComponent } from './components/accountant/accountant.component';
import { ProcessComponent } from './components/process/process.component';
import { DegreeComponent } from './components/degree/degree.component';
import { StudentComponent } from './components/student/student.component';
import { FormDialogComponent } from './components/accountant/form-dialog/form-dialog.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        SidenavComponent,
        AccountantComponent,
        ProcessComponent,
        DegreeComponent,
        StudentComponent,
        FormDialogComponent,
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
