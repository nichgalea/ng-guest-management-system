import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { MatProgressSpinnerModule, MatTabsModule, MatToolbarModule, MatIconModule } from "@angular/material";

import { ProfileDetailComponent } from "./profile-detail/profile-detail.component";
import { ProfileComponent } from "./profile.component";
import { ProfileIdsComponent } from "./profile-ids/profile-ids.component";
import { ProfileTimelineComponent } from "./profile-timeline/profile-timeline.component";
import { QuickFactsComponent } from "./quick-facts/quick-facts.component";

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileDetailComponent,
    ProfileIdsComponent,
    ProfileTimelineComponent,
    QuickFactsComponent
  ],
  imports: [BrowserModule, MatToolbarModule, MatProgressSpinnerModule, MatTabsModule, RouterModule, MatIconModule]
})
export class ProfileModule {}
