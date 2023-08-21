import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

  
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit {
    constructor(private router: Router, private http:HttpClient) { }
    ngOnInit(): void {
        
    }
    
    navigateToHomePage() {
        const currentUrl = this.router.url;
        
        // Check if the current route is not the login or signup page
        if (currentUrl !== '/login' && currentUrl !== '/signup') {
            // Navigate to the home page
            this.router.navigateByUrl('/home');
        }
        }
    
  logout()
  {
    
    this.http.delete("http://localhost:8080/users/logout").subscribe((response: any)=>
    {
      console.log(response);
      alert("Logged Out.")

    });
    this.router.navigateByUrl('/login')
  }
}
