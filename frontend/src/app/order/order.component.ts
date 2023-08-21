import { Component } from '@angular/core';
import { CreateOrderComponent } from './create-order/create-order.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../services/errorHandlerService';
import { Router } from '@angular/router';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { Order } from './order.model';
import { Product } from '../product/product.model';
import { User } from '../user/user.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  createOrderDialogRef: MatDialogRef<CreateOrderComponent> | null = null;
  manageOrderDialogRef: MatDialogRef<ManageOrdersComponent> | null = null;

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService, public dialog: MatDialog, private router: Router) {}

  orders: Order[] = [];
  products: Product[] = [];
  users: User[] = [];
  ngOnInit(): void {
    this.loadUsers();
    this.loadProducts();
    this.loadOrders();
  }
  

  private loadOrders(): void {
    this.http.get<Order[]>('http://localhost:8080/orders').subscribe(
      (orders) => {
        this.orders = orders;
        console.log(this.orders);
      },
      (error) => {
        console.error('Error fetching orders:', error);
        this.errorHandler.handle(error);
      }
    );
  }

  private loadProducts(): void {
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

  private loadUsers(): void {
    this.http.get<User[]>('http://localhost:8080/users').subscribe(
      (users) => {
        this.users = users;
        console.log(this.users);
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.errorHandler.handle(error);
      }
    );
  }

  getProductName(productId: number): string {
    const product = this.products.find((p) => p.id === productId);
    return product ? product.name : 'Unknown';
  }

  getUserName(userId: number): string | undefined {
    const user= this.users.find((u) => u.id === userId);
    const fullName = user?.firstName+" "+user?.lastName;
  return fullName
 }

  getCost(productId: number): number {
    const product = this.products.find((p) => p.id === productId);
    return product ? product.cost : -1;
  }


  deleteOrder(id:number): void {
    this.http.delete<Order[]>('http://localhost:8080/orders/'+id).subscribe(
      () => {
        alert("order Deleted");
        this.loadOrders()
      },
      (error) => {
        console.error('Error deleting order:', error);
        this.errorHandler.handle(error);
      }
    );
  }


  openCreateOrderDialog(): void {
    if (this.createOrderDialogRef && this.createOrderDialogRef.componentInstance) {
      // The UpdateUserDialogComponent is already open. You can close it if needed.
      this.createOrderDialogRef.close();
      this.createOrderDialogRef = null; // Reset the dialogRef variable.
    } else {
      // The UpdateUserDialogComponent is not open. Open a new instance.
      this.createOrderDialogRef = this.dialog.open(CreateOrderComponent);
      this.createOrderDialogRef.afterClosed().subscribe(() => {
        this.loadOrders();
        this.createOrderDialogRef = null; // Reset the dialogRef variable when the UpdateUserDialogComponent is closed.
      });
    }
  }

  openEditOrderDialog(data: any): void {
    if (this.manageOrderDialogRef && this.manageOrderDialogRef.componentInstance) {
      // The UpdateCredentialsDialogComponent is already open. You can close it if needed.
      this.manageOrderDialogRef.close();
      this.manageOrderDialogRef = null; // Reset the dialogRef variable.
    } else {
      // The UpdateCredentialsDialogComponent is not open. Open a new instance.
      this.manageOrderDialogRef = this.dialog.open(ManageOrdersComponent, {data});
      this.manageOrderDialogRef.afterClosed().subscribe(() => {
        this.loadOrders();
        this.manageOrderDialogRef = null; // Reset the dialogRef variable when the UpdateCredentialsDialogComponent is closed.
      });
    }
  }

}
