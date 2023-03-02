import {Component, OnInit} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {Router} from "@angular/router";
import {map} from "rxjs";
import * as _ from "lodash";

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
        this.auth.idTokenClaims$.pipe(
            map((tokenData) => {
                const role: string[] = _.get(tokenData, "tesis-api/roles", [])
                switch (role[0]) {
                    case "admin":
                        this.router.navigate(['admin']).then();
                        break;
                    case "student":
                        this.router.navigate(['student']).then();
                        break;
                }
            })
        ).subscribe()
    }

    loginWithRedirect(): void {
        this.auth.loginWithRedirect();
    }
}
