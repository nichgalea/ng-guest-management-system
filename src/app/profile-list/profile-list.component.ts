import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-profile-list",
  templateUrl: "./profile-list.component.html",
  styleUrls: ["./profile-list.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class ProfileListComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  submitSearch(e) {
    e.preventDefault();

    // console.log(e);
  }
}
