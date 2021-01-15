import { Injectable } from '@angular/core';
import {HttpClientModule,HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
// import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  player: any;

  constructor(private http: HttpClient) { }

  registerplayer(player) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:4000/players/register', player, {headers: headers})
    // .map(res => res.json());
  }
}
