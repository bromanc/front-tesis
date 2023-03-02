import { Component, OnInit } from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";

@Component({
  selector: 'app-sidenav',
  templateUrl: './student-sidenav.component.html',
  styleUrls: ['./student-sidenav.component.css']
})
export class StudentSidenavComponent implements OnInit {
  constructor(public auth: AuthService) {
  }

  ngOnInit(): void {
    this.auth.user$.subscribe();
  }

  logout() {
    this.auth.logout();
  }
}
