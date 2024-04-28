// login.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    // Simulate login logic, replace with your actual authentication logic
    if (this.username === 'admin' && this.password === 'password') {
      // Navigate to dashboard or any other page upon successful login
      this.router.navigate(['/dashboard']);
    } else {
      // Show error message or handle failed login attempt
      console.log('Invalid credentials. Please try again.');
    }
  }
}
