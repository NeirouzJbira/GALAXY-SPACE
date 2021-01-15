import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }
  
// validate username & email & password
  validateRegister(user) {
    if( user.username == undefined || user.email == undefined ||  user.password == undefined) {
        return false;
    } else {
      return true;
    }
  };

  // validate email 
  validateEmail( email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test( email);
  };
}
