import { Component } from '@angular/core';
import { AuthService } from '../../Core/Servises/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router,private http: HttpClient) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        
            // Now fetch users to find userId
      this.http.get<any[]>('https://fakestoreapi.com/users').subscribe(users => {
        const user = users.find(u => u.username === this.username);
        if (user) {
          localStorage.setItem('userId', user.id);
          this.router.navigate(['/products']);
        } else {
          alert('User found in auth, but not in users list');
        }
      });
      },
      error: () => {
        alert('Invalid credentials');
      }
    });
  }
}
