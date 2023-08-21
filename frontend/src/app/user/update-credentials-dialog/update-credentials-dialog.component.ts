import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { ErrorHandlerService } from 'src/app/services/errorHandlerService';

@Component({
  selector: 'app-update-credentials-dialog',
  templateUrl: './update-credentials-dialog.component.html',
  styleUrls: ['./update-credentials-dialog.component.scss']
})
export class UpdateCredentialsDialogComponent {
  
  id: string="";
  username: string="";
  password: string="";
  cPassword: string="";
  role: string="";

  constructor(public dialogRef: MatDialogRef<UpdateCredentialsDialogComponent>, private errorHandler: ErrorHandlerService, private http: HttpClient, private router:Router) { }

  async save() {
    try {
      if (this.password !== this.cPassword) {
        alert("Passwords do not match.");
        return;
      }
      const id = this.id.toString()

      let bodyData = 
      {
        "id" : this.id,
        "username" : this.username,
        "password" : this.password,        
        "role" : this.role
      };
      const url = 'http://localhost:8080/cred/' + id;

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
