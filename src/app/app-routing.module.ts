import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "@auth0/auth0-angular";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {
        path: 'admin',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule)
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
