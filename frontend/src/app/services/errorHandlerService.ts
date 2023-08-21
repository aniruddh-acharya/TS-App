import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlerService {
  constructor(private router: Router) {}

  handle(error: any): void {
    if (error instanceof HttpErrorResponse) {
      // Handle HTTP errors
      if (error.status === 401) {
        // Redirect to login page or perform other actions for unauthorized access
        alert("User Login Failed.")
        this.router.navigate(['/login']);
      } else if (error.status === 403) {
        alert("Access Only to Admins.") // Handle forbidden access
        this.router.navigate(['/home']);
      } else if (error.status === 404) {
        alert("Page Not Found!") // Handle not found errors 
      } else if (error.status === 409) {
        alert("Conflict occured") // Handle not found errors
      } else if (error.status === 400) {
        alert("Input Invalid!") // Handle Bad Request errors
      } else if (error.status === 204) {
        alert("No Content") // Handle no content errors
      } else if (error.status === 500) {
        alert("Internal Server Error. Please Try Again Later") // Handle server errors
      } else if (error.status === 0) {
        alert("Server Issue. Please Try Again Later") // Handle server errors
      } else {
        alert("Unknown Exception has Occured") // Handle other HTTP errors
        console.log(error);
      }
    } else {
      // Handle other types of errors
    }
  }
}
