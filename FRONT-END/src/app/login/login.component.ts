import { Component, OnInit } from '@angular/core';
import { AuthService , RegisterPlayer } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLoginSubmit() {
    const registerplayer : RegisterPlayer  = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticatePlayer(registerplayer).subscribe(data => {
        if(data.success) {
          console.log('You are login now');     
          localStorage.setItem('token',data.token)
          this.router.navigate(['profile']);
        }else {
          this.router.navigate(['login']);
          console.log('please verified your account');
        }
    });
  }
}
