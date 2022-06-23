import { Component } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router) {}

  logout() {
    if (window.localStorage) {
      window.localStorage.removeItem('auth');
      window.localStorage.removeItem('refresh');
      this.router.navigate(['auth']);
    }
  }
}
