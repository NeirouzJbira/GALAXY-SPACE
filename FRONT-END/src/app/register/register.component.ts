import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../services/validate.service';
import {AuthService, IPlayer} from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  
  username: string;
  email: string;
  password: string;

  constructor(
    private validateService: ValidateService,
    private authService:AuthService,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }
  
  onRegisterSubmit() {
    // console.log('you have submitting ')
  const player : IPlayer = {
    username: this.username,
    email: this.email,
    password: this.password
  }
   // Required Fields
   if(!this.validateService.validateRegister(player)) {
   console.log('please fill all the field');
   return false;
  }
  // Validate Email
  if(!this.validateService.validateEmail(player.email)) {
    console.log('please use a valid email');
    return false;
   }
   // Register user
   this.authService.registerplayer(player).subscribe(data => {
    if(data.success) {
      console.log('You are now registered and can now login');
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/register']);
      console.log('Something went wrong');
    }
  });
}
}

