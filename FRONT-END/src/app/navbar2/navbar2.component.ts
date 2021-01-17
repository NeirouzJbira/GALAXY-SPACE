import { Component, OnInit } from '@angular/core';
import { AuthService  } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.css']
})
export class Navbar2Component implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  
  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/']);
    return false;
  }
}
