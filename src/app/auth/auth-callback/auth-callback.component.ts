import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Subscription, tap} from "rxjs";

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnDestroy {
  subscription: Subscription | null = null;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {
    const code: string | null = route.snapshot.queryParams['code'];
    const encodedCid: string | null = window.localStorage.getItem('cid');
    if (code && encodedCid) {
      this.subscription = this.http.post(`https://accounts.spotify.com/api/token?grant_type=authorization_code&redirect_uri=http://localhost:4200/auth/callback&code=${code}`, null, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${encodedCid}`
        }
      })
      .pipe(
        tap((resp: any) => {
          if (window?.localStorage) {
            window.localStorage.setItem('auth', resp.access_token);
            window.localStorage.setItem('refresh', resp.refresh_token);
            console.debug('authorization successful....redirecting');
          }
          this.router.navigateByUrl('/dashboard');
        })
      )
      .subscribe();
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
