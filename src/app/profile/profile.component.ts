import { Component, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Route } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map, switchMap } from "rxjs/operators";

import { Profile } from "src/models";
import { getProfileById } from "src/app/redux/profiles";
import { RootState } from "../redux";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit, OnDestroy {
  private profile$$: Subscription;
  private profile: Profile | undefined = undefined;
  private profileTabsRoutes = [
    {
      path: "detail",
      label: "Profile Detail"
    },
    {
      path: "ids",
      label: "Profile ID's"
    },
    {
      path: "timeline",
      label: "Activity Timeline"
    }
  ];

  constructor(private activatedRoute: ActivatedRoute, private store: Store<RootState>) {}

  ngOnInit() {
    this.profile$$ = this.activatedRoute.paramMap
      .pipe(
        map(routeMap => routeMap.get("id")),
        switchMap(id => this.store.pipe(select(state => getProfileById(state.profiles, id))))
      )
      .subscribe(p => (this.profile = p));
  }

  ngOnDestroy() {
    this.profile$$.unsubscribe();
  }
}
