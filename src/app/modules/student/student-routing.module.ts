import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {StudentSidenavComponent} from "./components/sidenav/student-sidenav.component";
import {ProcessComponent} from "./components/process/process.component";

const routes: Routes = [
    {
        path: '',
        component: StudentSidenavComponent,
        children: [
            {path: '', redirectTo: '/student/process', pathMatch: 'full'},
            {path: 'process', component: ProcessComponent},
            {path: '**', redirectTo: '/student/process', pathMatch: 'full'}
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudentRoutingModule {
}
