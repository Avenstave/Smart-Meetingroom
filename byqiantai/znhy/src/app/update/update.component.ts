import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EquipmentService } from '../equipment.service';
import { device } from '../equipment';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})

export class UpdateComponent implements OnInit {
  devices$: Observable<device[]>;
  equments: string;
  upForm: FormGroup;
  id: AbstractControl;
  devName: AbstractControl;
  status: AbstractControl;
  meet_num: AbstractControl;
  private isResult: boolean;
  constructor(private equ: EquipmentService, private http: HttpClient, private formBuilder: FormBuilder, ) {
    this.upForm = formBuilder.group({
      'id': ['', Validators.compose([Validators.required])],
      'devName': ['', Validators.compose([Validators.required])],
      'status': ['', Validators.compose([Validators.required])],
      'meet_num': ['', Validators.compose([Validators.required])],
    });
    this.id = this.upForm.controls['id'];
    this.devName = this.upForm.controls['devName'];
    this.status = this.upForm.controls['status'];
    this.meet_num = this.upForm.controls['meet_num'];
    this.isResult = false;
  }



  ngOnInit(): void {
    this.devices$ = <Observable<device[]>>
      this.equ.getDevices();

  }

  refresh() {
    this.devices$ = <Observable<device[]>>
      this.equ.getDevices();

  }

  add(value) {
    return this.http.post('http://127.0.0.1:3000/addDevice/' + value.id + '/' + value.devName + '/' + value.meet_num, {}).subscribe((value2: any) => {
      console.log(value);
      console.log(value2);
      if (value2.succ) {
        alert("添加成功！")
      } else {
        alert('添加失败！');
      }
    });
  }

  delete(value) {
    return this.http.post('http://127.0.0.1:3000/deleteDevice/' + value.id + '/' + value.devName, {}).subscribe((value2: any) => {
      console.log(value);
      console.log(value2);
      if (value2.succ) {
        alert("删除成功！")
      } else {
        alert('删除失败！');
      }
    });
  }


  update(value) {
    return this.http.post('http://127.0.0.1:3000/updateDevice/' + value.id + '/' + value.devName + '/' + value.status, {}).subscribe((value2: any) => {
      console.log(value);
      console.log(value2);
      if (value2.succ) {
        alert("修改成功！")
      } else {
        alert('修改失败！');
      }
    });
  }

  select(value) {
    if (this.isResult == false) {
      this.isResult = true;
      return this.http.post('http://127.0.0.1:3000/selectDevice/' + value.id + '/' + value.devName, {}).subscribe((value2: any) => {
        console.log(value);
        console.log(value2.resp);
        if (value2.succ) {
          this.equments = value2.resp;
          console.log(this.equments);
        } else {
          alert('查询失败！');
        }
      });
    } else {
      this.isResult = false;
    }
    return;
  }

}
