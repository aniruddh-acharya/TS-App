import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { ErrorHandlerService } from 'src/app/services/errorHandlerService';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: 'update-user-dialog.component.html',
})
export class UpdateUserDialogComponent {
  id: string="";
  firstName: string="";
  lastName: string="";
  age=0;

  constructor(public dialogRef: MatDialogRef<UpdateUserDialogComponent>, private errorHandler: ErrorHandlerService, private http: HttpClient, private router:Router) { }

  async save() {
    try {
      const id = this.id.toString()
      console.log("id: ", id);

      let bodyData = 
      {
        "id" : this.id,
        "firstName" : this.firstName,
        "lastName" : this.lastName,
        "age" : this.age,
      };
      const url = 'http://localhost:8080/users/' + id;

      const updateResponse: any = await firstValueFrom(this.http.patch(url, bodyData));
      console.log(updateResponse);
      this.dialogRef.close();
      alert("Updated Successfully.");
    } catch (error) {
      this.errorHandler.handle(error);
    }
  }
  

  userUpdate(){
    this.save();
  }
  onCloseClick(): void {
    this.dialogRef.close();
  }
}
