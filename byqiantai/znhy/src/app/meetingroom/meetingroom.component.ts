import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { meetingroom } from '../equipment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EquipmentService } from '../equipment.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meetingroom',
  templateUrl: './meetingroom.component.html',
  styleUrls: ['./meetingroom.component.css']
})
export class MeetingroomComponent implements OnInit {
  mtees: string;
  meets: string;
  meetss: string;
  succ: boolean;
  upForm: FormGroup;
  id: AbstractControl;
  search: AbstractControl;
  status: AbstractControl;
  isResult: boolean;
  myFrm: FormGroup;
  constructor(private http: HttpClient, private router: Router, private equ: EquipmentService, private formBuilder: FormBuilder, ) {
    this.upForm = formBuilder.group({
      'id': ['', Validators.compose([Validators.required])],
      'status': ['', Validators.compose([Validators.required])],
    });
    this.myFrm = formBuilder.group({
      'search': ['', Validators.compose([Validators.required])],
    });
    this.id = this.upForm.controls['id'];
    this.status = this.upForm.controls['status'];
    this.search = this.myFrm.controls['search'];
    this.isResult = false;
  }

  ngOnInit() {
    let i = 0;
    timer(2000, 2000).subscribe(() => {
      this.http.get('http://127.0.0.1:3000/meet', {}).subscribe((value: any) => {
        this.meets = value;
      });
    });

    timer(2000, 2000).subscribe(() => {
      this.http.get('http://127.0.0.1:3000/met', {}).subscribe((value: any) => {
        this.mtees = value;
        //console.log(this.mtees);
      });
    });
  }

  add(value) {
    return this.http.post('http://127.0.0.1:3000/addmeet/' + value.id + '/' + value.status, {}).subscribe((value2: any) => {
      console.log(value);
      console.log(value2);
      if (value2.succ) {
        alert("创建成功！")
      } else {
        alert('创建失败！');
      }

    });

  }
  signin(meet_num) {
    this.equ.Meet_num = meet_num;
    this.equ.sign(meet_num, function () {
      this.router.navigate(['/home']);
    }.bind(this));

  }

  select(value) {
    console.log(value);
    return this.http.post('http://127.0.0.1:3000/selectMeet/' + value.search, {}).subscribe((value2: any) => {
      console.log(value);
      console.log(value2);
      if (this.isResult == false) {
        this.isResult = true;
        if (value2) {
          alert("找到该会议室！")
          this.meetss = value2.resp;
        }
      } else {
        this.isResult = false;
        alert('未找到会议室！');
      }
    });
  }


  delete(met_num) {
    return this.http.post('http://127.0.0.1:3000/delMeet/' + met_num, {}).
      subscribe(
        (value2: any) => {
          console.log(met_num);
          console.log(value2);
          if (value2.succ) {
            alert("删除成功！")
          } else {
            alert('删除失败！');
          }

        });
  }
}
