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
      console.log(data)
        // if(data.success) {
        //   this.authService.storePlayerData(data.token, data.user);
        //   console.log('You are login now');     
        //   this.router.navigate(['profile']);
        // } else {
        //   this.router.navigate(['login']);
        // }
    });
  }
}
