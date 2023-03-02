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
import {LoadingComponent} from "./components/loading/loading.component";
import {LoginComponent} from "./components/login/login.component";

@NgModule({
    declarations: [
        AppComponent,
        LoadingComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        MaterialModule,
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
        {provide: Window, useValue: window},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
