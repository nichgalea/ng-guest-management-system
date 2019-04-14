import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProfileListComponent } from "./profile-list/profile-list.component";

const routes: Routes = [{ path: "", component: ProfileListComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
