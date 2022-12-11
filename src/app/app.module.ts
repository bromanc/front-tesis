import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule, AuthHttpInterceptor} from '@auth0/auth0-angular';
import {environment as env} from '../environments/environment';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { StudentsComponent } from './pages/students/students.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';


@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        NavBarComponent,
        LoadingComponent,
        StudentsComponent,
        SidenavComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AuthModule.forRoot({
            ...env.auth,
            httpInterceptor: {
                ...env.httpInterceptor,
            },
        }),
        HttpClientModule,
        BrowserAnimationsModule,
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true},
        {provide: Window, useValue: window,},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
