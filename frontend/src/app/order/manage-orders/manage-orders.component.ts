import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Order } from './../order.model';
import { ErrorHandlerService } from '../../services/errorHandlerService';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent {
  orders: Order[] = [];
  userID: number=0;
  productID: number=0;
  quantity: number=0;
  
  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService, public dialogRef: MatDialogRef<ManageOrdersComponent>,
    @Inject(MAT_DIALOG_DATA) private order:any) {}

    ngOnInit(): void {
      // Set the initial values of name and cost based on the product object
      this.userID = this.order.userID;
      this.productID = this.order.productID;
      this.quantity = this.order.quantity;
  }
  
  updateOrder(): void {
    let bodyData = 
      {
        "userID" : this.userID,
        "productID" : this.productID,
        "quantity" : this.quantity
      };
      const id=this.order.id
      const url = 'http://localhost:8080/orders/' + id;
      
    this.http.patch<Order[]>(url,bodyData).subscribe(
      () => {
        alert("Order updated");
      },
      (error) => {
        console.error('Error deleting product:', error);
        this.errorHandler.handle(error);
      }
    );
  }
  
  onCloseClick(): void {
    this.dialogRef.close();
  }
}
