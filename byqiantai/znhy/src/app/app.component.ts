import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username: string;
  constructor(private router: Router, private auth: AuthService, private http: HttpClient) {
  }

  tiuchu() {
    console.log(this.auth.userName);
    return this.http.post('http://127.0.0.1:3000/Logout/' + this.auth.userName, {})
      .subscribe((value2: any) => {
        console.log(this.auth.userName);
        console.log(value2);
        if (value2.succ) {
          this.auth.logout();
          this.router.navigate(['./show']);
        } else {
          alert('退出失败！');
        }

      });

  }
}
