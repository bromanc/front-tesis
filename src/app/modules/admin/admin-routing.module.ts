import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SidenavComponent} from "./components/sidenav/sidenav.component";
import {StudentComponent} from "./components/student/student.component";
import {DegreeComponent} from "./components/degree/degree.component";
import {ProcessComponent} from "./components/process/process.component";
import {AccountantComponent} from "./components/accountant/accountant.component";

const routes: Routes = [
    {
        path: '',
        component: SidenavComponent,
        children: [
            {path: 'student', component: StudentComponent},
            {path: 'degree', component: DegreeComponent},
            {path: 'process', component: ProcessComponent},
            {path: 'accountant', component: AccountantComponent},
            {path: '', redirectTo: '/admin/student', pathMatch: 'full'}
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
