import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Boot, IEditorConfig, IToolbarConfig } from '@tuieditor/editor';
import { Observable } from 'rxjs';
import { InlineEditorComponent } from '../inline-editor/inline-editor.component';
import { ChartModule } from '../inline-editor/plugins/chart';
import { insertChart } from '../inline-editor/plugins/chart/helper';
import { ChartElement } from '../inline-editor/plugins/chart/types';
import { WTextElement } from '../inline-editor/plugins/text/types';
import { parseData } from '../inline-editor/plugins/text/helper';

@Component({
  selector: 't-document-editor-biz',
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DocumentEditorComponent),
      multi: true
    }
  ]
})
export class DocumentEditorComponent extends InlineEditorComponent {

  /**
   * 创建图表的方法，由于本业务组件库不想依赖图表库，所以由外部提供创建图表的方法
   */
  @Input() createChart!: (dom: HTMLElement, chartName: string) => any;
  /**
   * 获取数据的方法，异步
   */
  @Input() getData!: (dataConf: any) => Observable<any>;


  editorConf: Partial<IEditorConfig> = {
    hoverbarKeys: {
      wText: {
        menuKeys: ['confWTextData']
      },
      chart: {
        menuKeys: ['enter']
      }
    },
    MENU_CONF: {
      confWTextData: {
        selectData: (id: string) => {
          this.onSelectData.emit({ id, type: 'WText' });
        },
        autoGetData: true,
        getData: (elem: WTextElement) => {
          const { id, dataConf } = elem;
          if (!dataConf) return;

          this.getData(dataConf).subscribe(result => {
            const { wTexts } = this.editor.getConfig().EXTEND_CONF;
            if (!wTexts[id] || !result) return;
            wTexts[id].innerHTML = parseData(result, dataConf);
          });
        }
      },
      insertChart: {
        selectData: (id: string) => {
          this.onSelectData.emit({ id, type: 'TChart' });
        },
        createChart: (dom: HTMLElement, elem: ChartElement) => {
          const { id, chartName, dataConf } = elem;
          // 创建并缓存图表实例
          const chart = this.createChart(dom, chartName);
          const { EXTEND_CONF } = this.editor.getConfig();
          EXTEND_CONF.charts[id] = chart;
          // 获取数据
          this.getData(dataConf).subscribe(res => {
            // console.log(res, '获取数据成功');
          });
        }
      }
    },
    EXTEND_CONF: {
      wTexts: {},
      charts: {}
    },
  };

  toolbarConf: Partial<IToolbarConfig> = {
    toolbarKeys: [
      'undo',
      'redo',
      'clearStyle',
      '|',
      {
        key: 'group-insert',
        title: '插入',
        menuKeys: ['uploadImage', 'uploadVideo', 'insertTable', 'insertChart', 'insertLink', 'insertWText', 'codeBlock', 'divider']
      },
      '|',
      'headerSelect',
      'fontFamily',
      'fontSize',
      'bold',
      'italic',
      'underline',
      'through',
      'sub',
      'sup',
      'color',
      'bgColor',
      '|',
      'bulletedList',
      'numberedList',
      'todo',
      'delIndent',
      'indent',
      {
        key: 'group-justify',
        title: '对齐',
        iconSvg: '<svg viewBox=\"0 0 1024 1024\"><path d=\"M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z\"></path></svg>',
        menuKeys: ['justifyLeft', 'justifyRight', 'justifyCenter', 'justifyJustify']
      },
      'lineHeight',
      '|',
      'blockquote'
    ]
  }

  ngOnInit(): void {
    super.ngOnInit();
    Boot.registerModule(ChartModule);
  }

  setTChartOption(options: any) {
    insertChart(this.editor, options.id, options.chartName, options.dataConf);
  }

}
