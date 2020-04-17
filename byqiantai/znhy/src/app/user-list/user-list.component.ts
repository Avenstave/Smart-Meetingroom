import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userForm: FormGroup;
  username: AbstractControl;
  password: AbstractControl;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
    this.userForm = formBuilder.group({
      'userName': ['', Validators.compose([Validators.required])],
    });
    this.username = this.userForm.controls['userName'];
  }

  ngOnInit() {
  }
  delete(value) {
    if (!this.username.valid) {
      alert("请填写您の用户名！");
    }

    return this.http.post('http://127.0.0.1:3000/user/' + value.userName, {}, {}).subscribe((value2: any) => {
      console.log(value);
      console.log(value2);
      if (value2.succ) {
        alert("注销成功！")
        //   this.router.navigate(['/login']);
      } else {
        alert('您注销的用户名不存在！');
      }

    });
  }
}
