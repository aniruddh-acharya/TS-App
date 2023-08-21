import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../services/errorHandlerService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router: Router, private http: HttpClient, private errorHandler: ErrorHandlerService)
    {
  
    }
  
  ngOnInit(){
    this.http.get("http://localhost:8080/home").subscribe((response: any)=>
      {
        console.log(response);
      },   
      (error) => {
        this.errorHandler.handle(error);
      });
  }

  users()
    {
      this.router.navigateByUrl('/users')
    }

  products()
  {
    this.router.navigateByUrl('/products')
  }

  orders()
  {
    this.router.navigateByUrl('/orders')
  }

}
