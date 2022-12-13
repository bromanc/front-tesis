import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthGuard, AuthHttpInterceptor} from "@auth0/auth0-angular";
import {StudentsComponent} from "./pages/students/students.component";
import {AccountantComponent} from "./pages/accountant/accountant.component";
import {LoginComponent} from "./pages/login/login.component";

const routes: Routes = [
    {path: "", component: LoginComponent},
    {
        path: "", canActivate: [AuthGuard], children: [
            {path: "", canActivate: [AuthGuard], component: AccountantComponent},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true}],
})
export class AppRoutingModule {
}
