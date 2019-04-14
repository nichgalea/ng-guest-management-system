import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Profile } from "src/models";

@Injectable({
  providedIn: "root"
})
export class ProfilesService {
  constructor(private httpClient: HttpClient) {}

  getProfiles(): Observable<Profile[]> {
    return this.httpClient.get<Profile[]>("https://profiles-list.firebaseio.com/Data.json");
  }
}
