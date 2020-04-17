import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { timer } from 'rxjs';
import { EquipmentService } from '../equipment.service';
import { humituer, env3, env, env2 } from '../equipment';
import { HttpClient } from '@angular/common/http';
let d1 = new Date().toLocaleString();
@Component({
  selector: 'app-frist-page',
  templateUrl: './frist-page.component.html',
  styleUrls: ['./frist-page.component.css']
})
export class FristPageComponent implements OnInit {
  date = d1;
  public pm = 0;
  temp: Number = 0;
  humd: Number = 0;
  co2: Number = 0;
  light: Number = 0;
  yw: Number = 0;
  YWS = '';
  pmS = '';
  tempS = '';
  humdS = '';
  co2S = '';
  lightS = '';
  constructor(private http: HttpClient) { }

  ngOnInit() {
    let i = 0;
    timer(2000, 2000).subscribe(() => {
      this.http.get('http://127.0.0.1:3000/humiture', {}).subscribe((value: any) => {
        console.log(value);
        console.log(this.temp);
        console.log(this.humd);
        this.temp = Math.round(value[0].temp * 10) / 10;
        this.humd = Math.round(value[0].humd * 10) / 10;
        if (this.temp < 10) {
          this.tempS = '寒冷';
        } else {
          this.tempS = '适中';
        }
        if (this.humd > 60) {
          this.humdS = '潮湿';
        } else {
          this.humdS = '适中';
        }
      });
    });
    //o2
    timer(2000, 2000).subscribe(() => {
      this.http.get('http://127.0.0.1:3000/env', {}).subscribe((value: any) => {
        this.light = Math.round(value[0].light * 10) / 10;
        if (this.light < 300) {
          this.lightS = '过暗';
        } else {
          this.lightS = '适中';
        }
      });
    });
    //yw,
    timer(2000, 2000).subscribe(() => {
      this.http.get('http://127.0.0.1:3000/env2', {}).subscribe((value: any) => {
        this.pm = Math.round(value[0].pM);
        if (this.pm > 75) {
          this.pmS = '超标';
        } else {
          this.pmS = '适中';
        }
      });
    });

    timer(2000, 2000).subscribe(() => {
      this.http.get('http://127.0.0.1:3000/env3', {}).subscribe((value: any) => {
        this.yw = Math.round(value[0].yw * 100) / 100;
        if (this.yw > 10) {
          this.YWS = '有火灾';
        } else {
          this.YWS = '正常';
        }
      });
    });

  }
}
