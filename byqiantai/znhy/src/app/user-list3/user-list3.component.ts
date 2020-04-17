import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { user } from '../equipment';
import { Observable, timer } from 'rxjs';
import { EquipmentService } from '../equipment.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-list3',
  templateUrl: './user-list3.component.html',
  styleUrls: ['./user-list3.component.css']
})
export class UserList3Component implements OnInit {
  upForm: FormGroup;
  userId: AbstractControl;
  user: AbstractControl;
  users: string;
  users$: Observable<user[]>;
  isResult: boolean;
  //auh:boolean;
  constructor(private http: HttpClient, private formBuilder: FormBuilder, private equ: EquipmentService,
    private auth: AuthService) {
    this.upForm = formBuilder.group({
      'userId': ['', Validators.compose([Validators.required])],
      'user': ['', Validators.compose([Validators.required])],
    });
    this.userId = this.upForm.controls['userId'];
    this.user = this.upForm.controls['user'];
    this.isResult = false;
  }

  ngOnInit() {

  }

  refresh() {
    if (this.isResult == false) {
      this.isResult = true;
      this.users$ = <Observable<user[]>>
        this.equ.getUsers();
    } else {
      this.isResult = false;
    }
  }

  select(value) {
    if (this.isResult == true) {
      this.isResult = false;
      return this.http.post('http://127.0.0.1:3000/selectUser/' + value.userId + '/' + value.user, {}).subscribe((value2: any) => {
        console.log(value);
        console.log(value2);
        if (value2.succ) {
          this.users = value2.resp;
          console.log(this.users);
        } else {
          alert('查询失败！');
        }

      });
    } else {
      this.isResult = true;
    }
  }
}
