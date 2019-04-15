import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  templateUrl: "./error-dialog.component.html"
})
export class ErrorDialogComponent {
  constructor(public dialogRef: MatDialogRef<ErrorDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  close(): void {
    this.dialogRef.close();
  }
}
