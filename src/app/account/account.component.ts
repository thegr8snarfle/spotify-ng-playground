import { Component, OnInit } from '@angular/core';
import {SpotifyApiService} from "../common/spotify-api.service";
import {Observable} from "rxjs";
import {Account} from "../model/spotify.model";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public account$: Observable<Account> | null = null;

  constructor(private spotify: SpotifyApiService) { }

  ngOnInit(): void {
    this.account$ = this.spotify.fetchAccount();
  }

}
