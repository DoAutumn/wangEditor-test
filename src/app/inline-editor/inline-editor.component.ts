import { Transforms } from "slate";
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { Boot, DomEditor, IDomEditor, IEditorConfig, IToolbarConfig } from '@tuieditor/editor';
import { WTextModule } from './plugins/text';
import { WTextElement } from './plugins/text/types';
import { getWTexts, parseData } from "./plugins/text/helper";

@Component({
  selector: 't-inline-editor-biz',
  templateUrl: './inline-editor.component.html',
  styleUrls: ['./inline-editor.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InlineEditorComponent),
      multi: true
    }
  ]
})
export class InlineEditorComponent implements OnInit, ControlValueAccessor {

  /**
   * 外部监听该事件，开始配置数据源信息
   */
  @Output() onSelectData = new EventEmitter();

  editorConf: Partial<IEditorConfig> = {
    hoverbarKeys: {
      wText: {
        menuKeys: ['confWTextData', 'viewWText']
      }
    },
    MENU_CONF: {
      confWTextData: {
        selectData: (id: string) => {
          this.onSelectData.emit({ id, type: 'WText' });
        }
      }
    },
    EXTEND_CONF: {
      wTexts: {}
    },
  };

  toolbarConf: Partial<IToolbarConfig> = {
    toolbarKeys: [
      'undo',
      'redo',
      'clearStyle',
      '|',
      'headerSelect',
      'fontFamily',
      'fontSize',
      'bold',
      'italic',
      'underline',
      'color',
      'bgColor',
      '|',
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
      'insertLink',
      'insertWText'
    ]
  };

  editor!: IDomEditor;

  constructor(protected cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    Boot.registerModule(WTextModule);
  }

  onEditorInit(editor: IDomEditor) {
    this.editor = editor;
  }

  /**
   * 外部设置html
   * @param html 
   */
  // setHtml(html: string) {
  //   this.html = html;
  //   this.cdr.detectChanges();
  // }

  /**
   * 配置好数据源之后，调用该方法将信息传递进来
   * @param options 
   */
  setWTextOption(options: any) {
    const { id, dataConf, result } = options;
    const { wTexts } = this.editor.getConfig().EXTEND_CONF;

    this.editor.restoreSelection();
    const props: Partial<WTextElement> = { dataConf: dataConf };
    Transforms.setNodes(this.editor, props, {
      match: n => DomEditor.checkNodeType(n, 'wText')
    });

    if (!wTexts[id] || !result) return;
    wTexts[id].innerHTML = parseData(result, dataConf);
  }

  /**
   * 外部获取所有WText
   */
  getWTexts() {
    return getWTexts(this.editor);
  }


  /** --------------- [(ngModel)] --------------- */

  /**
   * 默认使用 HTML 格式传递数据，wangeditor 还支持 JSON、Text 格式
   */
  html: string = '';

  onModelChange: Function = () => { };

  onModelTouched: Function = () => { };

  writeValue(value: string): void {
    this.html = value;
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }

}
