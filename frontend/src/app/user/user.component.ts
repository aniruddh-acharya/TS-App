import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { User } from './user.model';
import { ErrorHandlerService } from '../services/errorHandlerService';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UpdateUserDialogComponent } from './update-user-dialog/update-user-dialog.component';
import { Router } from '@angular/router';
import { UpdateCredentialsDialogComponent } from './update-credentials-dialog/update-credentials-dialog.component';
import { Cred } from './cred.model';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  credentials: Cred[] = [];
  updateUserDialogRef: MatDialogRef<UpdateUserDialogComponent> | null = null;
  updateCredDialogRef: MatDialogRef<UpdateCredentialsDialogComponent> | null = null;
  
  constructor(private http: HttpClient, private cdRef: ChangeDetectorRef, private errorHandler: ErrorHandlerService, public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadCredentials();
  }

  private loadUsers(): void {
    this.http.get<User[]>('http://localhost:8080/users').pipe(
      catchError((error) => {
        console.error('Error fetching users:', error);
        this.errorHandler.handle(error);
        return of([]); // Return an empty array to prevent displaying the content
      })
    ).subscribe((users) => {
      users.sort((a, b) => a.id - b.id); // Sort users based on ID
      this.users = users;
    });
  }

  private loadCredentials(): void {
    this.http.get<Cred[]>('http://localhost:8080/cred').pipe(
      catchError((error) => {
        console.error('Error fetching credentials:', error);
        this.errorHandler.handle(error);
        return of([]); // Return an empty array to prevent displaying the content
      })
    ).subscribe((credentials) => {
      this.credentials = credentials;
    });
  }


  // Helper function to find credentials for a user by ID
  getCredentialsByUserId(userId: number): Cred | null {
    const userCredentials = this.credentials.find((cred) => cred.id === userId);
    return userCredentials || null;
  }

  openUpdateUserDialog(): void {
    this.cdRef.detectChanges();
    if (this.updateUserDialogRef && this.updateUserDialogRef.componentInstance) {
      // The UpdateUserDialogComponent is already open. You can close it if needed.
      this.updateUserDialogRef.close();
      this.updateUserDialogRef = null; // Reset the dialogRef variable.
    } else {
      // The UpdateUserDialogComponent is not open. Open a new instance.
      this.updateUserDialogRef = this.dialog.open(UpdateUserDialogComponent);
      this.updateUserDialogRef.afterClosed().subscribe(() => {
        this.updateUserDialogRef = null; // Reset the dialogRef variable when the UpdateUserDialogComponent is closed.
        this.loadUsers();
      });
    }
  }

  openUpdateCredDialog(): void {
    this.cdRef.detectChanges();
    if (this.updateCredDialogRef && this.updateCredDialogRef.componentInstance) {
      // The UpdateCredentialsDialogComponent is already open. You can close it if needed.
      this.updateCredDialogRef.close();
      this.updateCredDialogRef = null; // Reset the dialogRef variable.
    } else {
      // The UpdateCredentialsDialogComponent is not open. Open a new instance.
      this.updateCredDialogRef = this.dialog.open(UpdateCredentialsDialogComponent);
      this.updateCredDialogRef.afterClosed().subscribe(() => {
        this.updateCredDialogRef = null; // Reset the dialogRef variable when the UpdateCredentialsDialogComponent is closed.
        this.loadCredentials();
      });
    }
  }
}
