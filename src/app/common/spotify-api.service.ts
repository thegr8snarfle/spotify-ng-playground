import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Account} from "../model/spotify.model";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {

  private baseURI: string = 'https://api.spotify.com/v1/';

  constructor(private http: HttpClient) { }

  public fetchAccount(): Observable<Account> {
    return this.http.get<Account>(this.baseURI.concat('me'))
      .pipe(
        map((response: Account) => response)
      );
  }
}
