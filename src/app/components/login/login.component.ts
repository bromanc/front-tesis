import {Component, OnInit} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(
        public auth: AuthService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.auth.isAuthenticated$.subscribe(x => {
            if (x) {
                this.router.navigate(['admin'])
            }
        })
    }

    loginWithRedirect(): void {
        this.auth.loginWithRedirect({
            appState: {target: '/admin/student'}
        });
    }
}
