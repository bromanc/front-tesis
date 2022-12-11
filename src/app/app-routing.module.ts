import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthGuard, AuthHttpInterceptor} from "@auth0/auth0-angular";
import {StudentsComponent} from "./pages/students/students.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";

const routes: Routes = [
    {path: "", component: StudentsComponent, canActivate: [AuthGuard]},
    {path: "students", component: StudentsComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true}],
})
export class AppRoutingModule {
}
