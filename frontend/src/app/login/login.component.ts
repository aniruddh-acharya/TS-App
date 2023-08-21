import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../services/errorHandlerService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
   
    username: string="";
    password: string="";

    isLogin: boolean= true;
    errorMessage: string = "";
  
    constructor(private router: Router, private http: HttpClient, private errorHandler: ErrorHandlerService)
    {
  
    }
  
    ngOnInit(): void
    {
  
    }
  
    login()
    {
      let bodyData = 
      {
        "username" : this.username,
        "password" : this.password
      
      };
      this.http.post("http://localhost:8080/users/login",bodyData).subscribe((response: any)=>
      {
        if (response.token) {
          // Check if the status code is 200
          sessionStorage.setItem('accessToken', response.token);
          this.router.navigateByUrl('/home');
          alert("Logged In Successfully.");
        } else {
          console.log("Login Error")
          alert("Incorrect Username or Password.");
        }
      },
      (error) => {
        this.errorHandler.handle(error);
      });
    }
  
    save()
    {
      this.login();
    }

}
