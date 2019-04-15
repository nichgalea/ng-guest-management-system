import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { Store, select } from "@ngrx/store";

import { getProfileById } from "src/app/redux/profiles";
import { RootState } from "src/app/redux";
import { Profile } from "src/models";

@Component({
  selector: "app-profile-detail",
  templateUrl: "./profile-detail.component.html",
  styleUrls: ["./profile-detail.component.scss"]
})
export class ProfileDetailComponent implements OnInit, OnDestroy {
  private profile$$: Subscription;
  private profile: Profile | undefined = undefined;

  constructor(private activatedRoute: ActivatedRoute, private store: Store<RootState>) {}

  ngOnInit() {
    this.profile$$ = this.activatedRoute.parent.paramMap
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
