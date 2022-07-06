import { Component } from '@angular/core';
import { Router} from "@angular/router";
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router, public auth: AuthService) {}

  logout() {
    if (window.localStorage) {
      this.auth.logout().then(() => this.router.navigate(['auth']));
    }
  }
}
