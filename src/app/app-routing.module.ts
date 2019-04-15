import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProfileListComponent } from "./profile-list/profile-list.component";
import { ProfileComponent } from "./profile/profile.component";
import { ProfileDetailComponent } from "./profile/profile-detail/profile-detail.component";
import { ProfileIdsComponent } from "./profile/profile-ids/profile-ids.component";
import { ProfileTimelineComponent } from "./profile/profile-timeline/profile-timeline.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "profiles"
  },
  {
    path: "profiles",
    component: ProfileListComponent
  },
  {
    path: "profiles/:id",
    component: ProfileComponent,
    children: [
      { path: "", pathMatch: "full", redirectTo: "detail" },
      { path: "detail", component: ProfileDetailComponent },
      { path: "ids", component: ProfileIdsComponent },
      { path: "timeline", component: ProfileTimelineComponent }
    ]
  },
  {
    path: "**",
    redirectTo: "profiles"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
