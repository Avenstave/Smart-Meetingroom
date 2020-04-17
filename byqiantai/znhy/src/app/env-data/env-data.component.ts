import { Component, OnInit } from '@angular/core';
import { env } from '../equipment';
import { Observable, timer } from 'rxjs';
import { EquipmentService } from '../equipment.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-env-data',
  templateUrl: './env-data.component.html',
  styleUrls: ['./env-data.component.css']
})
export class EnvDataComponent implements OnInit {
  envs$: Observable<env[]>;
  constructor(private equ: EquipmentService, private http: HttpClient) { }

  ngOnInit() {
    this.envs$ = <Observable<env[]>>
      this.equ.getEnv1s();
  }
  cleanAll() {
    return this.http.post('http://127.0.0.1:3000/cleanAllEnv', {}, {}).subscribe((value2: any) => {
      if (value2.succ == true) {
        alert("清空成功！")
      } else {
        alert("清空失败！")
      }
    });
  }
  refresh() {
    this.envs$ = <Observable<env[]>>
      this.equ.getEnv1s();
    alert("已刷新数据");
  }
}
