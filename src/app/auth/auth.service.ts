import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Credentials} from "../model/spotify.model";
import { Observable, tap} from "rxjs";

export const CLIENT_SID_KEY = 'cid';
export const AUTH_TOKEN_KEY = 'auth';
export const REFRESH_TOKEN_KEY = 'refresh';

/**
 * Handles all things related to authenticating against the Spotify API.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public get isAuthenticated(): boolean {
    return !!this.authToken;
  }

  public get authToken() {
    return window.localStorage.getItem(AUTH_TOKEN_KEY);
  }

  public get refreshToken() {
    return window.localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  public get clientSID() {
    return window.localStorage.getItem(CLIENT_SID_KEY);
  }

  constructor(private http: HttpClient) { }

  /**
   * Fetches an authorization code for use in the authorization code flow.
   * @param clientId
   */
  public fetchAuthorizationCode(clientId: string) {
    window.location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${'http://localhost:4200/auth/callback'}`;
  }

  /**
   * Fetches an auth token to hit the Spotify web API.
   * @param authorizationCode
   */
  public fetchAuthToken(authorizationCode: string): Observable<any> {
    return this.http.post(`https://accounts.spotify.com/api/token?grant_type=authorization_code&redirect_uri=http://localhost:4200/auth/callback&code=${authorizationCode}`, null, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${this.clientSID}`
      }
    })
    .pipe(
      tap((resp: any) => {
        window.localStorage.setItem(AUTH_TOKEN_KEY, resp.access_token);
        window.localStorage.setItem(REFRESH_TOKEN_KEY, resp.refresh_token);
      })
    );
  }

  public setClientSID(credentials: Credentials): void {
    const clientSID = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
    window.localStorage.setItem(CLIENT_SID_KEY, clientSID);
  }

  public logout(): Promise<void> {
    return new Promise(res => {
      window.localStorage.removeItem(AUTH_TOKEN_KEY);
      window.localStorage.removeItem(REFRESH_TOKEN_KEY);
      window.localStorage.removeItem(CLIENT_SID_KEY);
      res();
    })
  }
}
