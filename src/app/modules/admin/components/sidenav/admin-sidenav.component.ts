import {Component, OnInit} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";

@Component({
    selector: 'app-sidenav',
    templateUrl: './admin-sidenav.component.html',
    styleUrls: ['./admin-sidenav.component.css']
})
export class AdminSidenavComponent implements OnInit {

    constructor(public auth: AuthService) {
    }

    ngOnInit(): void {
        this.auth.user$.subscribe();
    }

    logout() {
        this.auth.logout();
    }
}
