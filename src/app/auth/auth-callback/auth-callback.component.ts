import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { of, takeWhile} from "rxjs";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-auth-callback',
  template: `<h1 class="h1">{{ message }}</h1>`,
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnDestroy {
  public message: string = 'Please wait...';
  private isAlive: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute, private auth: AuthService) {
    auth.fetchAuthToken(route.snapshot.queryParams['code'])
      .pipe(
        takeWhile(() => this.isAlive)
      )
      .subscribe({
        next: () => this.router.navigateByUrl('/dashboard'),
        error: ({ error }) => {
          this.message = error.error;
          return of([]);
        }
      })
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }

}
