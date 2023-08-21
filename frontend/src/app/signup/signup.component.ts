import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../services/errorHandlerService';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  firstName: string="";
  lastName: string="";
  username: string="";
  password: string="";
  role: string="";
  age=0;
  isSubmitting = false;

  constructor(private router: Router, private http: HttpClient, private errorHandler: ErrorHandlerService)
  {

  }

  ngOnInit(): void
  {

  }

  async signup()
  {
    this.isSubmitting = true;
    let bodyData = 
    {
      "firstName" : this.firstName,
      "lastName" : this.lastName,
      "username" : this.username,
      "password" : this.password,
      "role" : this.role,
      "age" : this.age,
    
    };
    await this.http.post("http://localhost:8080/users/signup",bodyData).subscribe((response: any)=>
    {
      console.log(response);
      this.router.navigateByUrl('/login');
      alert("Signed Up Successfully.")
    },   
    (error: HttpErrorResponse) => {
      this.errorHandler.handle(error);
      this.isSubmitting = false;
    });
  }

}
