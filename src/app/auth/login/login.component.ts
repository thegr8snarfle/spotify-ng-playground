import {Component, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription, tap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  public formGroup: FormGroup = this.formBuilder.group({
    clientId: [ '', [ Validators.required ] ],
    clientSecret: [ '', [ Validators.required ] ]
  });
  public subs: Subscription[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  public ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  private subscribeTo(sub: Subscription) {
    this.subs.push(sub);
  }

  authorize(): void {
    if (this.formGroup.valid) {
      const { clientId, clientSecret } = this.formGroup.getRawValue();
      const encodedClientSid: string = btoa(`${clientId}:${clientSecret}`);
      window.localStorage.setItem('cid', encodedClientSid);
      window.location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${'http://localhost:4200/auth/callback'}`;
    }
  }

}
