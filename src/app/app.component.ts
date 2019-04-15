import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material";

import { ErrorDialogComponent } from "./error-dialog/error-dialog.component";
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

  title = "Guest Management System";

  constructor(private profilesService: ProfilesService, private dialog: MatDialog, private store: Store<RootState>) {}

  ngOnInit() {
    this.getProfiles();
  }

  getProfiles() {
    this.subscription = this.profilesService
      .getProfiles()
      .subscribe(profiles => this.store.dispatch(new SetProfiles(profiles)), this.handleGetProfilesError.bind(this));
  }

  handleGetProfilesError() {
    const dialogRef = this.dialog.open(ErrorDialogComponent);
    dialogRef.afterClosed().subscribe(() => this.getProfiles());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
