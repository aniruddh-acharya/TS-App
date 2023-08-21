import { Component, ViewEncapsulation } from '@angular/core';
import { CreateProductComponent } from './create-product/create-product.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../services/errorHandlerService';
import { Router } from '@angular/router';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { Product } from './product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductComponent {
  
  createProductDialogRef: MatDialogRef<CreateProductComponent> | null = null;
  manageProductDialogRef: MatDialogRef<ManageProductComponent> | null = null;

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService, public dialog: MatDialog, private router: Router) {}

  products: Product[] = [];
  ngOnInit(): void {
    this.loadProducts();
  }
  

  loadProducts(): void {
    this.http.get<Product[]>('http://localhost:8080/products').subscribe(
      (products) => {
        this.products = products;
        console.log(this.products);
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.errorHandler.handle(error);
      }
    );
  }

  deleteProduct(id:number): void {
    this.http.delete<Product[]>('http://localhost:8080/products/'+id).subscribe(
      () => {
        alert("Product Deleted");
        this.loadProducts()
      },
      (error) => {
        console.error('Error deleting product:', error);
        this.errorHandler.handle(error);
      }
    );
  }


  openCreateProductDialog(): void {
    if (this.createProductDialogRef && this.createProductDialogRef.componentInstance) {
      // The UpdateUserDialogComponent is already open. You can close it if needed.
      this.createProductDialogRef.close();
      this.createProductDialogRef = null; // Reset the dialogRef variable.
    } else {
      // The UpdateUserDialogComponent is not open. Open a new instance.
      this.createProductDialogRef = this.dialog.open(CreateProductComponent);
      this.createProductDialogRef.afterClosed().subscribe(() => {
        this.loadProducts();
        this.createProductDialogRef = null; // Reset the dialogRef variable when the UpdateUserDialogComponent is closed.
      });
    }
  }

  openEditProductDialog(data: any): void {
    if (this.manageProductDialogRef && this.manageProductDialogRef.componentInstance) {
      // The UpdateCredentialsDialogComponent is already open. You can close it if needed.
      this.manageProductDialogRef.close();
      this.manageProductDialogRef = null; // Reset the dialogRef variable.
    } else {
      // The UpdateCredentialsDialogComponent is not open. Open a new instance.
      this.manageProductDialogRef = this.dialog.open(ManageProductComponent, {data});
      this.manageProductDialogRef.afterClosed().subscribe(() => {
        this.loadProducts();
        this.manageProductDialogRef = null; // Reset the dialogRef variable when the UpdateCredentialsDialogComponent is closed.
      });
    }
  }

}
