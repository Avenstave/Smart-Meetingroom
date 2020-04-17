import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as echarts from 'echarts';
import 'echarts-liquidfill';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  public xAxis = [];
  public temps = [];
  public humds = [];
  public lights = [];//o2
  public yws = [];
  public ctime = [];
  public pMs = [];
  public o2s = [];

  constructor(private http: HttpClient) { }
  ngOnInit() {
    let i = 0;
    timer(2000, 2000).subscribe(() => {
      this.http.get('http://127.0.0.1:3000/humiture', {}).subscribe((value: any) => {
        console.log(value);
        if (value && value.length) {
          let i = value.length - 1;
          for (let item of value) {
            this.xAxis.push(item.time);
            this.temps.push(item.temp);
            this.humds.push(item.humd);
            i--;
          }
          if (i > 5) {
            this.xAxis.shift();
            this.temps.shift();
            this.humds.shift();
          }

          this.updateaOption = {
            xAxis: [{ data: this.xAxis }],
            series: [{ data: this.temps }, { data: this.humds }]
          }
          console.log(this.temps + '/' + this.humds);
        }
      });
    });
    //o2
    timer(2000, 2000).subscribe(() => {
      this.http.get('http://127.0.0.1:3000/env', {}).subscribe((value: any) => {
        console.log(value);
        if (value) {
          this.lights[0] = (value[0].light);
          this.Doption.series[0].data[0] = Number(this.lights[0]);
          this.updatebOption = {
            series: [{ data: [{ value: Number(this.lights[0]) }] }]
          }
          console.log(this.lights);
        }
      });
    });
    //yw,
    timer(2000, 2000).subscribe(() => {
      this.http.get('http://127.0.0.1:3000/env2', {}).subscribe((value: any) => {
        console.log(value);
        if (value && value.length) {
          let i = value.length - 1;
          for (let item of value) {
            this.pMs.push(item.pM);
            this.o2s.push(item.o2);
            this.ctime.push(item.time);
            i--;
          }
          if (i > 5) {
            this.ctime.shift();
            this.pMs.shift();
            this.o2s.shift();
          }

          this.updatecOption = {
            xAxis: [{ data: this.ctime }],
            series: [
              { data: this.pMs },
              { data: this.o2s },]
          }
        }
      });
    });

    timer(2000, 2000).subscribe(() => {
      this.http.get('http://127.0.0.1:3000/env3', {}).subscribe((value: any) => {
        console.log(value);
        if (value) {
          this.yws[0] = (value[0].yw);
          this.Poption.series[0].data[0].value = Number(this.yws[0]);
          this.updatedOption = {
            series: [{ data: [{ value: Number(this.yws[0]) }] }]
          }
        }
      });
    });

  }
  updateaOption = {};
  updatebOption = {};
  updatecOption = {};
  updatedOption = {};

  Hoption = {
    grid: {
      bottom: 40
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        animation: false,
        label: {
          backgroundColor: 'rgb(97, 142, 205)'
        }
      }
    },
    legend: {
      data: ['温度', '湿度'],
      textStyle: {
        fontWeight: 'normal',
        fontSize: 12,
        color: 'rgb(97, 142, 205)'
      },
      x: 'center'
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisLine: { onZero: false },
        data: [],
        axisLabel: {
          show: true,
          textStyle: {
            color: 'rgb(97, 142, 205)',
          },
        },
      },

    ],
    yAxis: [
      {
        name: '温度℃',
        type: 'value',
        axisLabel: {
          show: true,
          textStyle: {
            color: 'rgb(97, 142, 205)',
          }
        },
        max: 100
      },
      {
        name: '湿度%',
        nameLocation: 'start',
        max: 100,
        type: 'value',
        inverse: true,
        axisLabel: {
          show: true,
          textStyle: {
            color: 'rgb(97, 142, 205)',
          },
        },
      }
    ],
    series: [
      {
        name: '温度',
        type: 'line',
        animation: false,
        areaStyle: {
        },
        lineStyle: {
          width: 1
        },

        data: []
      },
      {
        name: '湿度',
        type: 'line',
        yAxisIndex: 1,
        animation: false,
        areaStyle: {
        },

        stack: '总量',
        lineStyle: {
          width: 1
        },
        data: []
      }
    ]
  };

  Poption = {
    series: [
      {
        name: 'pH',
        type: 'gauge',
        center: ['50%', '50%'],
        z: 3,
        min: 0,
        max: 100,
        splitNumber: 10,
        radius: '100%',
        axisLine: {            // 坐标轴线
          lineStyle: {       // 属性lineStyle控制线条样式
            width: 10
          }
        },
        axisTick: {            // 坐标轴小标记
          length: 15,        // 属性length控制线长
          lineStyle: {       // 属性lineStyle控制线条样式
            color: 'auto'
          }
        },
        splitLine: {           // 分隔线
          length: 10,         // 属性length控制线长
          lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
            color: 'auto'
          }
        },
        axisLabel: {
          backgroundColor: 'auto',
          borderRadius: 1,
          color: '#eee',
          padding: 3,
          textShadowBlur: 2,
          textShadowOffsetX: 1,
          textShadowOffsetY: 1,
          textShadowColor: '#222'
        },
        title: {
          offsetCenter: [0, '-0%'],       // x, y，单位px
        },
        detail: {
          // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          formatter: function (value) {
            value = (value + '').split('.');
            value.length < 2 && (value.push('0'));
            return ('0' + value[0]).slice(-1)
              + '.' + (value[1] + '0').slice(0, 1);
          },
          fontWeight: 'bolder',
          borderRadius: 1,
          // backgroundColor: '#444',
          borderColor: '#aaa',
          shadowBlur: 1,
          shadowColor: '#000',
          shadowOffsetX: 0,
          shadowOffsetY: 3,
          borderWidth: 1,
          textBorderColor: '#000',
          textBorderWidth: 1,
          textShadowBlur: 1,
          textShadowColor: '#000',
          textShadowOffsetX: 0,
          textShadowOffsetY: 0,
          fontFamily: 'Arial',
          width: 30,
          color: '#eee',
        },
        data: [{ value: 0, name: 'g/ml' }]
      },]
  };

  chartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['pM2.5', 'O2'],
      textStyle: {
        fontWeight: 'normal',
        fontSize: 12,
        color: 'rgb(97, 142, 205)'
      }
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
      textStyle: {
        fontWeight: 'normal',
        fontSize: 12,
        color: 'rgb(97, 142, 205)'
      },
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: this.ctime,
        axisLabel: {
          show: true,
          textStyle: {
            color: 'rgb(97, 142, 205)',
          },
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        max: 300,
        axisLabel: {
          show: true,
          textStyle: {
            color: 'rgb(97, 142, 205)',
          }
        },
      }
    ],
    series: [
      {
        name: 'pM2.5',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        data: []
      },
      {
        name: 'O2',
        type: 'line',
        stack: '总量',
        label: {
        },
        areaStyle: { normal: {} },
        data: []
      }
    ]
  };

  Doption = {
    backgroundColor: '#fff',

    graphic: [{
      type: 'group',
      left: 'center',
      bottom: 10,
    }],
    series: [{
      type: 'liquidFill',
      radius: '70%',
      center: ['50%', '40%'],
      data: [],
      backgroundStyle: {
        borderWidth: 5,
        borderColor: '#1daaeb',
        color: '#fff'
      },
      label: {
        normal: {
          textStyle: {
            fontSize: 20
          }
        }
      }
    }]
  };
}