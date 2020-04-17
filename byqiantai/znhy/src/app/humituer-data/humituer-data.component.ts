import { Component, OnInit } from '@angular/core';
import { humituer } from '../equipment';
import { Observable, timer } from 'rxjs';
import { EquipmentService } from '../equipment.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-humituer-data',
  templateUrl: './humituer-data.component.html',
  styleUrls: ['./humituer-data.component.css']
})
export class HumituerDataComponent implements OnInit {
  humituers$: Observable<humituer[]>;
  constructor(private equ: EquipmentService, private http: HttpClient) { }
  ngOnInit() {
    this.humituers$ = <Observable<humituer[]>>
      this.equ.getHumituer1s();
  }

  cleanAll() {
    return this.http.post('http://127.0.0.1:3000/cleanAllHum', {}, {}).subscribe((value2: any) => {
      if (value2.succ == true) {
        alert("清空成功！")
      } else {
        alert("清空失败！")
      }
    });
  }
  refresh() {
    this.humituers$ = <Observable<humituer[]>>
      this.equ.getHumituer1s();
    alert("已刷新数据");
  }
}
