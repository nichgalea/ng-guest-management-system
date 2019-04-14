import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild, ElementRef } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { Subscription, fromEvent, merge } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { Store } from "@ngrx/store";

import { RootState } from "src/app/redux";
import { Profile } from "src/models";

@Component({
  selector: "app-profile-list",
  templateUrl: "./profile-list.component.html",
  styleUrls: ["./profile-list.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class ProfileListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private displayedColumns = ["avatar", "localid", "email", "fullname", "phone", "address", "modified", "view"];
  private profileDataSource = new MatTableDataSource<Profile>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("searchInput") searchInput: ElementRef<HTMLInputElement>;

  constructor(private store: Store<RootState>) {}

  ngOnInit() {
    this.profileDataSource.paginator = this.paginator;
    this.profileDataSource.sort = this.sort;
    this.profileDataSource.sortingDataAccessor = this.sortingDataAccessor;
    this.profileDataSource.filterPredicate = this.filterPredicate;

    const getProfiles$ = this.store
      .select(state => state.profiles)
      .forEach(profiles => (this.profileDataSource.data = profiles));

    const input$ = fromEvent(this.searchInput.nativeElement, "input")
      .pipe(debounceTime(300))
      .forEach(e => (this.profileDataSource.filter = (e.target as HTMLInputElement).value));

    this.subscription = merge(getProfiles$, input$).subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  submitSearch(e) {
    e.preventDefault();
  }

  sortingDataAccessor(profile: Profile, headerId: string): string {
    if (headerId === "fullname") {
      return `${profile.first_name} ${profile.last_name}`;
    }

    return profile[headerId];
  }

  filterPredicate(profile: Profile, filter: string) {
    const filterLower = filter.toLowerCase();

    const profileDataLower = `${profile.first_name} ${profile.last_name} ${profile.email}`.toLowerCase();

    return profileDataLower.indexOf(filterLower) !== -1;
  }
}
