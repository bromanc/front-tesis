import {Component, OnInit} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

    constructor(public auth: AuthService) {
    }

    ngOnInit(): void {
        this.auth.user$.subscribe(x => console.log(x))
    }

    logout() {
        this.auth.logout();
    }

}
