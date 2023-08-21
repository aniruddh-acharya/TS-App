import { NgModule } from '@angular/core';
import { BrowserModule }
	from '@angular/platform-browser';
import { AppRoutingModule }
	from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule }
	from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { JwtInterceptor } from './services/JwtInterceptor';
import { ErrorHandlerService } from './services/errorHandlerService';
import { UserComponent } from './user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateUserDialogComponent } from './user/update-user-dialog/update-user-dialog.component';
import { UpdateCredentialsDialogComponent } from './user/update-credentials-dialog/update-credentials-dialog.component';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { CreateOrderComponent } from './order/create-order/create-order.component';
import { ManageProductComponent } from './product/manage-product/manage-product.component';
import { ManageOrdersComponent } from './order/manage-orders/manage-orders.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';


@NgModule({
	declarations: [
		AppComponent,
  LoginComponent,
  SignupComponent,
  HomeComponent,
  UserComponent,
  UpdateUserDialogComponent,
  UpdateCredentialsDialogComponent,
  ProductComponent,
  OrderComponent,
  CreateProductComponent,
  CreateOrderComponent,
  ManageProductComponent,
  ManageOrdersComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
    	MatDialogModule,
		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		MatInputModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: JwtInterceptor,
			multi: true
		  },
		  ErrorHandlerService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }