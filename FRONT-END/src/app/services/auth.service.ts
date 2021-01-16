import { Injectable } from '@angular/core';
// import {HttpClientModule,HttpHeaders} from '@angular/common/http';
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


  constructor(private http: HttpClient) { }

  registerplayer(player : IPlayer ) {
  
    return this.http.post
    <{
      success : boolean,
       msg : string
    }>
  ('http://localhost:4000/players/register', player)
  }

  authenticatePlayer(player : RegisterPlayer ) {
    return this.http.post
    <{
      success : boolean,
       msg : string
    }>
    ('http://localhost:4000/players/authenticate',player)
      
  }
  // storePlayerData(token, player : RegisterPlayer ) {
  //   localStorage.setItem('id_token', token);
  //   localStorage.setItem('user', JSON.stringify(player));
  //   this.authToken = token;
    
  // }

}
