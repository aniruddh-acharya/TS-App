import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Product } from './../product.model';
import { ErrorHandlerService } from '../../services/errorHandlerService';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent {
  products: Product[] = [];
  name: string=""
  cost: number=0

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService, public dialogRef: MatDialogRef<ManageProductComponent>,
     @Inject(MAT_DIALOG_DATA) private product:any) {}

  ngOnInit(): void {
      // Set the initial values of name and cost based on the product object
      this.name = this.product.name;
      this.cost = this.product.cost;
  }
  updateProduct(): void {
    let bodyData = 
      {
        "name" : this.name,
        "cost" : this.cost
      };
      const id=this.product.id
      const url = 'http://localhost:8080/products/' + id;
      
    this.http.patch<Product[]>(url,bodyData).subscribe(
      () => {
        alert("Product updated");
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
