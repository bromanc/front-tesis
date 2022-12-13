import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule, AuthHttpInterceptor} from '@auth0/auth0-angular';
import {environment as env} from '../environments/environment';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {AppHttpInterceptor} from "./app.interceptor";
import {MaterialModule} from "./core/material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SidenavComponent} from "./components/sidenav/sidenav.component";
import {FormDialogComponent} from "./pages/accountant/forms/create/form-dialog.component";
import {LoadingComponent} from "./components/loading/loading.component";
import {AccountantComponent} from "./pages/accountant/accountant.component";
import {LoginComponent} from "./pages/login/login.component";
import {StudentsComponent} from "./pages/students/students.component";

@NgModule({
    declarations: [
        AppComponent,
        SidenavComponent,
        FormDialogComponent,
        LoadingComponent,
        AccountantComponent,
        LoginComponent,
        StudentsComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        MaterialModule,
        ReactiveFormsModule,
        AuthModule.forRoot({
            ...env.auth,
            httpInterceptor: {
                ...env.httpInterceptor,
            },
        }),
        ToastrModule.forRoot({
            timeOut: 5000,
            preventDuplicates: true,
            autoDismiss: true
        })
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true},
        {provide: Window, useValue: window,},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
