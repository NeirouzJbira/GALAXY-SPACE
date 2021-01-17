import { Injectable } from '@angular/core';
import {HttpClientModule,HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
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
      success : boolean,
      msg : string
    }>
    ('http://localhost:4000/players/profile')   
  }

  // loadToken() {
  //   const token = localStorage.getItem('id_token');
  //   this.authToken = token;
  // }

  // logout() {
  //   this.authToken = null;
  //   this.player = null;
  //   localStorage.clear();
  // }
}
