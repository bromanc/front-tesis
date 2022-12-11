import {Component, OnInit} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

    constructor(
        public auth: AuthService,
    ) {
    }

    ngOnInit(): void {
    }

    loginWithRedirect(): void {
        this.auth.loginWithRedirect({redirect_uri: `${environment.auth.redirectUri}`});
    }
}
