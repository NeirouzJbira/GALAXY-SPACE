import { Injectable } from '@angular/core';
import {HttpClientModule,HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
// import {JwtModule} from '@auth0/angular-jwt'
// import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';

export interface IPlayer {
  username: string
  email: string
  password: string
}

export interface RegisterPlayer {
  username: string
  password: string;
}


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authToken: string;
  player : string;
  logged : boolean;

  constructor(private http: HttpClient) { }

  registerplayer(player:IPlayer ) {
    return this.http.post
    <{
      success : boolean,
       msg : string
    }>
  ('http://localhost:4000/players/Register', player)
  }

  authenticatePlayer(player:RegisterPlayer ) {
    return this.http.post
    <{
      success : boolean,
      msg : string,
     
    }>
    ('http://localhost:4000/players/Authenticate',player) 
  }

  loginPlayer(player:RegisterPlayer ) {
    return this.http.post
    <{
      success : boolean,
      msg : string,
    }>
    ('http://localhost:4000/players/login',player) 
  }

  getProfile() {
    return this.http.get 
    <{
      player:object,
      success : boolean,
      msg : string
    }>
    ('http://localhost:4000/players/profile')   
  }


  loggedIn() {
    this.logged = false;
  }
  logout() {
    this.authToken = null;
    this.player = null;
    this.logged = true;
    localStorage.clear();
  }
}
