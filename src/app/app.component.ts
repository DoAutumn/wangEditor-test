import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { IDomEditor } from '@tuieditor/editor';
import * as echarts from 'echarts';
import { Observable, observable } from 'rxjs';
import { uuid } from './inline-editor/plugins/text/helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements AfterViewInit {

  editor!: IDomEditor;

  @ViewChild('editorBiz') editorBiz: any;

  htmlContent = '';
  // htmlContent = '<p><br></p><div data-w-e-type="chart" data-w-e-is-void data-id="E074354BC2F3ECF0" data-chartName="TrxLineChart" data-width="100%" data-height="300px" data-dataConf="㞂…ࡠ⸐숏总Ƙ聜ꀥ駒̸ౠ⦢䐏ꀻ鄁᠈┌Ѝ晀鰠͂䐄ᠼ檃즀ទ琁ᢸմ䦊⸀뚙ሪ葄䁟ºﯵ ">{{*chartE074354BC2F3ECF0}}</div><p><br></p>';
  // htmlContent = '<p> <span data-w-e-type="wText" data-id="1111">{{texttest<span style="color: rgb(54, 88, 226); font-size: 24px;"><strong>topsec</strong></span>}}</span> </p>';
  // htmlContent = `<h1 style="text-align: center;">安全分析</h1><p style="text-align: center;">报告周期：2023/08/09 17:00:00 — 2023/08/10 17:00:00</p><h2>安全分析</h2><div data-w-e-type="chart" data-w-e-is-void data-id="11111" data-chartName="TrxLineChart"></div><p>检索分析提供多种数据交互式检索的方式，包括快捷模式，高级模式以及专家模式，针对检索结果字段支持通用分析功能，并提供数据透视，您还可以将检索条件保存下来，以后使用。</p><p>威胁狩猎可以针对系统检测到的威胁或者监测到的事件进行调查，以调查任务的方式，通过收集任务线索来进行调查、取证。还原整个案件经过并提出定性和处理建议。</p><p>安全报告提供将系统内的数据可实时可定时的生成结果报告并输出到文件，并且内置了丰富的安全报告模板，供您使用。</p><h3>检索分析</h3><p>已汇入事件 {{text1}} ，最早事件 {{text2}} ，最新事件 {{text3}} </p><h3>威胁狩猎</h3><p>调查任务总数 {{text4}} 个，最近7天调查任务 {{text5}} 个，安全报告总数 {{text6}} 个，最近7天安全报告 {{text7}} 个</p><p><br></p><p style="text-align: center;">事件类型排行</p><p style="text-align: center;"><br></p><p style="text-align: center;">事件类型分布</p><p style="text-align: center;"><br></p><table style="width: 100%;"><tbody><tr><th colSpan="1" rowSpan="1" width="auto">发生时间</th><th colSpan="1" rowSpan="1" width="auto">事件名称</th><th colSpan="1" rowSpan="1" width="auto">严重等级</th><th colSpan="1" rowSpan="1" width="auto">事件类型</th><th colSpan="1" rowSpan="1" width="auto">源IP</th><th colSpan="1" rowSpan="1" width="auto">源端口</th><th colSpan="1" rowSpan="1" width="auto">目的IP</th><th colSpan="1" rowSpan="1" width="auto">目的端口</th></tr><tr><td colSpan="1" rowSpan="1" width="auto">2021-08-25 14:19:30</td><td colSpan="1" rowSpan="1" width="auto">垃圾邮件[121.234.31.181(中国 江苏省 盐城市)]</td><td colSpan="1" rowSpan="1" width="auto">信息</td><td colSpan="1" rowSpan="1" width="auto">其他</td><td colSpan="1" rowSpan="1" width="auto">85.12.92.88</td><td colSpan="1" rowSpan="1" width="auto">8045</td><td colSpan="1" rowSpan="1" width="auto">85.12.92.88</td><td colSpan="1" rowSpan="1" width="auto">7760</td></tr><tr><td colSpan="1" rowSpan="1" width="auto">2021-08-25 14:19:30</td><td colSpan="1" rowSpan="1" width="auto">垃圾邮件[121.234.31.181(中国 江苏省 盐城市)]</td><td colSpan="1" rowSpan="1" width="auto">信息</td><td colSpan="1" rowSpan="1" width="auto">其他</td><td colSpan="1" rowSpan="1" width="auto">85.12.92.88</td><td colSpan="1" rowSpan="1" width="auto">8045</td><td colSpan="1" rowSpan="1" width="auto">85.12.92.88</td><td colSpan="1" rowSpan="1" width="auto">7760</td></tr><tr><td colSpan="1" rowSpan="1" width="auto">2021-08-25 14:19:30</td><td colSpan="1" rowSpan="1" width="auto">垃圾邮件[121.234.31.181(中国 江苏省 盐城市)]</td><td colSpan="1" rowSpan="1" width="auto">信息</td><td colSpan="1" rowSpan="1" width="auto">其他</td><td colSpan="1" rowSpan="1" width="auto">85.12.92.88</td><td colSpan="1" rowSpan="1" width="auto">8045</td><td colSpan="1" rowSpan="1" width="auto">85.12.92.88</td><td colSpan="1" rowSpan="1" width="auto">7760</td></tr><tr><td colSpan="1" rowSpan="1" width="auto">2021-08-25 14:19:30</td><td colSpan="1" rowSpan="1" width="auto">垃圾邮件[121.234.31.181(中国 江苏省 盐城市)]</td><td colSpan="1" rowSpan="1" width="auto">信息</td><td colSpan="1" rowSpan="1" width="auto">其他</td><td colSpan="1" rowSpan="1" width="auto">85.12.92.88</td><td colSpan="1" rowSpan="1" width="auto">8045</td><td colSpan="1" rowSpan="1" width="auto">85.12.92.88</td><td colSpan="1" rowSpan="1" width="auto">7760</td></tr><tr><td colSpan="1" rowSpan="1" width="auto">2021-08-25 14:19:30</td><td colSpan="1" rowSpan="1" width="auto">垃圾邮件[121.234.31.181(中国 江苏省 盐城市)]</td><td colSpan="1" rowSpan="1" width="auto">信息</td><td colSpan="1" rowSpan="1" width="auto">其他</td><td colSpan="1" rowSpan="1" width="auto">85.12.92.88</td><td colSpan="1" rowSpan="1" width="auto">8045</td><td colSpan="1" rowSpan="1" width="auto">85.12.92.88</td><td colSpan="1" rowSpan="1" width="auto">7760</td></tr></tbody></table><p><br></p>`;

  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {
    // this.editorBiz.setHtml('<p><br></p><div data-w-e-type="chart" data-w-e-is-void data-id="E074354BC2F3ECF0" data-chartName="TrxLineChart" data-width="100%" data-height="300px" data-dataConf="㞂…ࡠ⸐숏总Ƙ聜ꀥ駒̸ౠ⦢䐏ꀻ鄁᠈┌Ѝ晀鰠͂䐄ᠼ檃즀ទ琁ᢸմ䦊⸀뚙ሪ葄䁟ºﯵ ">{{*chartE074354BC2F3ECF0}}</div><p><br></p>');
  }

  // test

  dialogVisible = false;

  tableData: any;

  obj: any;

  createChart(dom: HTMLElement, chartName: string) {
    const chart = echarts.init(dom)
    chart.setOption({
      grid: {
        top: '10%',
        bottom: '10%',
        right: '5%'
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    })
  }

  getData(dataConf: any) {
    return new Observable(observable => {
      observable.next({ num: 5000 });
    });
  }

  onSelectWilkinson(row: any) {
    const wilkinson = { id: row.id, periods: row.periods };
    this.dialogVisible = false;

    const { id, type } = this.obj;
    if (type === 'WText') {
      this.editorBiz.setWTextOption({ id: id, dataConf: { dataConf: wilkinson, showField: 'num' }, result: [{ num: 2000 }] })
    } else {
      this.editorBiz.setTChartOption({ id: id, chartName: 'TrxLineChart', dataConf: { dataConf: wilkinson } })
    }
  }

  getWilkinsonList(obj: any) {
    this.obj = obj;
    this.onSelectWilkinson({ id: uuid(), periods: {} });
    // this.http.get('/wilkinson/metrics/query?filter=&pageNo=1&pageSize=20&sortType=ASC&tagIds=&status=&multilevelComputer=false').subscribe((res: any) => {
    //   this.tableData = res.content;
    //   this.dialogVisible = true;
    // });
  }

  onGetHTML() {
    console.log(this.htmlContent);
  }
}
