import { Component, OnInit } from '@angular/core';
import { message } from '../equipment';
import { Observable, timer } from 'rxjs';
import { EquipmentService } from '../equipment.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-msg-data',
  templateUrl: './msg-data.component.html',
  styleUrls: ['./msg-data.component.css']
})
export class MsgDataComponent implements OnInit {
  msgs$: Observable<message[]>;
  constructor(private equ: EquipmentService, private http: HttpClient) { }

  ngOnInit() {
    this.msgs$ = <Observable<message[]>>
      this.equ.getMessages();
  }
  cleanAll() {
    return this.http.post('http://127.0.0.1:3000/cleanAllmessage', {}, {}).subscribe((value2: any) => {
      if (value2.succ == true) {
        alert("清空成功！")
      } else {
        alert("清空失败！")
      }
    });
  }
  refresh() {
    this.msgs$ = <Observable<message[]>>
      this.equ.getMessages();
    alert("已刷新数据");
  }
}
