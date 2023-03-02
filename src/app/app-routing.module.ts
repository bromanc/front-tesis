import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "@auth0/auth0-angular";
import {LoginComponent} from "./components/login/login.component";
import {RoleGuard} from "./auth/guard/role.guard";

const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {
        path: 'admin',
        canActivate: [AuthGuard, RoleGuard],
        loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule),
        data: {role: 'admin'},
    },
    {
        path: 'student',
        canActivate: [AuthGuard, RoleGuard],
        loadChildren: () => import('./modules/student/student.module').then((m) => m.StudentModule),
        data: {role: 'student'},
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
