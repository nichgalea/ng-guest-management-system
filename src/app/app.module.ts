import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatToolbarModule,
  MatInputModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatDialogModule
} from "@angular/material";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ProfileListComponent } from "./profile-list/profile-list.component";
import { LazyImageDirective } from "./lazy-image/lazy-image.directive";
import { reducers, metaReducers } from "./redux";
import { ProfileModule } from "./profile/profile.module";
import { ErrorDialogComponent } from "./error-dialog/error-dialog.component";

@NgModule({
  entryComponents: [ErrorDialogComponent],
  declarations: [AppComponent, LazyImageDirective, ProfileListComponent, ErrorDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    CommonModule,
    MatSortModule,
    ProfileModule,
    FormsModule,
    MatDialogModule,
    StoreModule.forRoot(reducers, { metaReducers })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
