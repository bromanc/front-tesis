import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import {MatTab} from "@angular/material/tabs";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatInputModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatDialogModule,
        MatMenuModule,
        MatListModule,
        MatToolbarModule,
        MatTableModule
    ],
    exports: [
        CommonModule,
        MatInputModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatDialogModule,
        MatMenuModule,
        MatListModule,
        MatToolbarModule,
        MatTableModule
    ]
})
export class MaterialModule {
}
