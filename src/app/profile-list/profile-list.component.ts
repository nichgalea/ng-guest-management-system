import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild, ElementRef } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { HttpClient } from "@angular/common/http";
import { Subscription, fromEvent, merge } from "rxjs";
import { debounceTime } from "rxjs/operators";

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

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.profileDataSource.paginator = this.paginator;
    this.profileDataSource.sort = this.sort;
    this.profileDataSource.sortingDataAccessor = this.sortingDataAccessor;
    this.profileDataSource.filterPredicate = this.filterPredicate;

    const getData = this.httpClient
      .get<Profile[]>("https://profiles-list.firebaseio.com/Data.json")
      .forEach(profiles => (this.profileDataSource.data = profiles));

    const t = fromEvent(this.searchInput.nativeElement, "input")
      .pipe(debounceTime(300))
      .forEach(e => (this.profileDataSource.filter = (e.target as HTMLInputElement).value));

    this.subscription = merge(getData, t).subscribe();
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
