import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { ProfilesService } from "./services/profiles/profiles.service";
import { RootState } from "./redux";
import { SetProfiles } from "./redux/profiles";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  title = "guest-management-system";

  constructor(private profilesService: ProfilesService, private store: Store<RootState>) {}

  ngOnInit() {
    this.subscription = this.profilesService.getProfiles().subscribe(profiles => {
      this.store.dispatch(new SetProfiles(profiles));
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
