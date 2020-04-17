import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { device } from '../equipment';
import { EquipmentService } from '../equipment.service';

@Component({
  selector: 'app-consoler',
  templateUrl: './consoler.component.html',
  styleUrls: ['./consoler.component.css']
})
export class ConsolerComponent implements OnInit {
  devices$: Observable<device[]>;
  constructor(private equ: EquipmentService) {

  }
  ngOnInit(): void {
    this.devices$ = <Observable<device[]>>
      this.equ.getDevices();

  }
  changeDevice(device: device) {
    this.equ.changeDevice(device.id, device.customer_status === 0 ? 1 : 0).subscribe((value: any) => {
      if (value.succ) {
        alert("修改成功！");
        if (device.customer_status === 1) {
          device.customer_status = 0;
          device.status = 0;
        } else {
          device.customer_status = 1;
          device.status = 1;
        }
      } else {
        alert("修改失败！");
      }

    });
  }

}
