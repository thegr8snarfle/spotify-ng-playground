import {Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public formGroup: FormGroup = this.formBuilder.group({
    clientId: [ '', [ Validators.required ] ],
    clientSecret: [ '', [ Validators.required ] ]
  });

  constructor(private formBuilder: FormBuilder, private auth: AuthService) {}

  authorize(): void {
    if (this.formGroup.valid) {
      const { clientId, clientSecret } = this.formGroup.getRawValue();
      this.auth.setClientSID({ clientId: clientId, clientSecret: clientSecret })
      this.auth.fetchAuthorizationCode(clientId);
    }
  }

}
