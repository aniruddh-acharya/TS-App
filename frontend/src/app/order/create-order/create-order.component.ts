import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { ErrorHandlerService } from 'src/app/services/errorHandlerService';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent {
  userID: number=0;
  productID: number=0;
  quantity: number=0;

  constructor(public dialogRef: MatDialogRef<CreateOrderComponent>, private errorHandler: ErrorHandlerService, private http: HttpClient, private router:Router) { }

  async save() {
    try {

      let bodyData = 
      {
        "userID" : this.userID,
        "productID" : this.productID,
        "quantity" : this.quantity
      };
      const url = 'http://localhost:8080/orders';

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
