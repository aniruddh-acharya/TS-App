import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { ErrorHandlerService } from 'src/app/services/errorHandlerService';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateProductComponent {

  name: string="";
  cost: number=0;

  constructor(public dialogRef: MatDialogRef<CreateProductComponent>, private errorHandler: ErrorHandlerService, private http: HttpClient, private router:Router) { }

  async save() {
    try {

      let bodyData = 
      {
        "name" : this.name,
        "cost" : this.cost
      };
      const url = 'http://localhost:8080/products';

      const updateResponse: any = await firstValueFrom(this.http.post(url, bodyData));
      console.log(updateResponse);
      this.dialogRef.close();
      
      alert("Added Successfully.");
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
