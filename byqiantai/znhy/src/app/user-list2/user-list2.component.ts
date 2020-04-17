import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-list2',
  templateUrl: './user-list2.component.html',
  styleUrls: ['./user-list2.component.css']
})
export class UserList2Component implements OnInit {
  userForm: FormGroup;
  userName: AbstractControl;
  password: AbstractControl;
  userId: AbstractControl;
  phone: AbstractControl;
  sex: AbstractControl;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
    this.userForm = formBuilder.group({
      'userId': ['', Validators.compose([Validators.required])],
      'userName': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required])],
      'sex': ['', Validators.compose([Validators.required])],
      'phone': ['', Validators.compose([Validators.required])],
    });
    this.userId = this.userForm.controls['userId'];
    this.userName = this.userForm.controls['userName'];
    this.password = this.userForm.controls['password'];
    this.sex = this.userForm.controls['sex'];
    this.phone = this.userForm.controls['phone'];
  }

  ngOnInit() {
  }
  onSubmit(value) {
    if (!this.userId.valid) {
      alert("请输入您的ID！");
    }
    else if (!this.userName.valid) {
      alert("请填写您想要注册的用户名！");
    }
    else if (!this.password.valid) {
      alert("请输入您的密码！");
    }
    else if (!this.sex.valid) {
      alert("请输入您的性别！");
    }
    else if (!this.phone.valid) {
      alert("请输入您的电话！");
    }
    return this.http.post('http://127.0.0.1:3000/upuser/' + value.userId + '/' + value.userName + '/' + value.password + '/' + value.sex + '/' + value.phone, {})
      .subscribe((value2: any) => {
        console.log(value);
        console.log(value2);
        if (value2.succ) {
          alert("修改成功！")
        } else {
          alert('修改失败！');
        }

      });
  }
}