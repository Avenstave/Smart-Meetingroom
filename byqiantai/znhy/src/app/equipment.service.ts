import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { device } from './equipment';
@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  Meet_num: string;

  constructor(private httpClient: HttpClient) {

    console.log(this.Meet_num)
  }

  sign(meet_num: any, callback: any): boolean {
    this.httpClient.post('http://127.0.0.1:3000/selMeet/' + meet_num, {}).subscribe((value2: any) => {
      console.log(value2);
      if (value2.succ == true) {
        // this.devices = value2.result;
        callback();
      }
      else {
        alert("没有找到设备！");
      }
    }
    );
    return;
  }
  getUsers() {
    return this.httpClient.get('http://127.0.0.1:3000/user');
  }

  getDevices() {
    return this.httpClient.get('http://127.0.0.1:3000/device/' + this.Meet_num);
  }
  getHumituers() {
    return this.httpClient.get('http://127.0.0.1:3000/humiture');
  }
  getEnvs() {
    return this.httpClient.get('http://127.0.0.1:3000/env');
  }
  getEnv2s() {
    return this.httpClient.get('http://127.0.0.1:3000/env2');
  }
  getEnv3s() {
    return this.httpClient.get('http://127.0.0.1:3000/env3');
  }
  getHumituer1s() {
    return this.httpClient.get('http://127.0.0.1:3000/humiture1');
  }
  getEnv1s() {
    return this.httpClient.get('http://127.0.0.1:3000/env1');
  }
  getEnv21s() {
    return this.httpClient.get('http://127.0.0.1:3000/env21');
  }
  getEnv31s() {
    return this.httpClient.get('http://127.0.0.1:3000/env31');
  }
  getMessages() {
    return this.httpClient.get('http://127.0.0.1:3000/messages');
  }


  changeDevice(id, status) {
    return this.httpClient.post('http://127.0.0.1:3000/device/' + id + '/' + status, {});
  }
}
