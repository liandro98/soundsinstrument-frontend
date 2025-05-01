import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-session-expiry-dialog',
  templateUrl: './session-expiry-dialog.component.html',
  styleUrls: ['./session-expiry-dialog.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule]
})
export class SessionExpiryDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SessionExpiryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { countdown: number }
  ) {}

  ngOnInit(): void {
    // Inicialización del componente
  }

  continueSession(): void {
    this.dialogRef.close(true);
  }

  logout(): void {
    this.dialogRef.close(false);
  }
}
