import { Component, OnInit } from '@angular/core';
import { env2 } from '../equipment';
import { Observable, timer } from 'rxjs';
import { EquipmentService } from '../equipment.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-env2-data',
  templateUrl: './env2-data.component.html',
  styleUrls: ['./env2-data.component.css']
})
export class Env2DataComponent implements OnInit {
  env2s$: Observable<env2[]>;
  constructor(private equ: EquipmentService, private http: HttpClient) { }

  ngOnInit() {
    this.env2s$ = <Observable<env2[]>>
      this.equ.getEnv21s();
  }
  cleanAll() {
    return this.http.post('http://127.0.0.1:3000/cleanAllEnv2', {}, {}).subscribe((value2: any) => {
      if (value2.succ == true) {
        alert("清空成功！")
      } else {
        alert("清空失败！")
      }
    });
  }
  refresh() {
    this.env2s$ = <Observable<env2[]>>
      this.equ.getEnv21s();
    alert("已刷新数据");
  }
}
