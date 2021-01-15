import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../services/validate.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  username: String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService) { }

  ngOnInit(): void {
  }
  
  onRegisterSubmit() {
    // console.log('you have submitting ')
  const player = {
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
}

}
