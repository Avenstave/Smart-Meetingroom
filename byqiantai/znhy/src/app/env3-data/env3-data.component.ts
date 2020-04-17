import { Component, OnInit } from '@angular/core';
import { env3 } from '../equipment';
import { Observable, timer } from 'rxjs';
import { EquipmentService } from '../equipment.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-env3-data',
  templateUrl: './env3-data.component.html',
  styleUrls: ['./env3-data.component.css']
})
export class Env3DataComponent implements OnInit {
  env3s$: Observable<env3[]>;
  constructor(private equ: EquipmentService, private http: HttpClient) { }

  ngOnInit() {
    this.env3s$ = <Observable<env3[]>>
      this.equ.getEnv31s();
  }
  cleanAll() {
    return this.http.post('http://127.0.0.1:3000/cleanAllEnv3', {}, {}).subscribe((value2: any) => {
      if (value2.succ == true) {
        alert("清空成功！")
      } else {
        alert("清空失败！")
      }
    });
  }
  refresh() {
    this.env3s$ = <Observable<env3[]>>
      this.equ.getEnv31s();
    alert("已刷新数据");
  }
}
