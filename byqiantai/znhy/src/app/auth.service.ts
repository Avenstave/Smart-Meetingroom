import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /*是否已经登录*/
  private loggedIn = false;
  userName: string;
  constructor(private http: HttpClient, private router: Router) { }
  login(u: any, callback: any): boolean {

    this.http.post('http://127.0.0.1:3000/user', JSON.stringify(u)).subscribe(
      (resp: any) => {
        console.log(resp);
        if (resp.succ) {
          this.loggedIn = true;
          callback();
        }
        else {
          this.loggedIn = false;
          alert("登录失败");
        }
      }
    );
    return;
  }
  logout() {
    this.loggedIn = false;
  }
  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
