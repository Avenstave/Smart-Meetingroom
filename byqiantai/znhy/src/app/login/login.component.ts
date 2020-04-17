import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userName: AbstractControl;
  password: AbstractControl;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) {
    this.loginForm = formBuilder.group({
      'userName': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required])],
    });
    this.userName = this.loginForm.controls['userName'];
    this.password = this.loginForm.controls['password'];
  }

  ngOnInit() {
  }
  onSubmit(value) {
    if (!this.userName.valid) {
      alert("请输入用户名");
    }
    else if (!this.password.valid) {
      alert("请输入密码")
      return;

    }
    this.auth.userName = value.userName;
    this.auth.login(value, function () {
      this.router.navigate(['/meet']);
    }.bind(this));

  }

}
