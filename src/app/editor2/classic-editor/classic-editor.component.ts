import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IDomEditor, IEditorConfig, IToolbarConfig, createEditor, createToolbar } from '@tuieditor/editor';

@Component({
  selector: 't-classic-editor',
  templateUrl: './classic-editor.component.html',
  styleUrls: ['./classic-editor.component.less', '../style/index.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ClassicEditorComponent),
      multi: true
    }
  ]
})
export class ClassicEditorComponent implements OnInit, OnChanges, AfterViewInit, ControlValueAccessor {

  /**
   * editor config
   */
  @Input() editorConf!: Partial<IEditorConfig>;

  /**
   * toolbar config
   */
  @Input() toolbarConf: Partial<IToolbarConfig> = {
    toolbarKeys: [
      'undo',
      'redo',
      'clearStyle',
      '|',
      {
        key: 'group-insert',
        title: '插入',
        menuKeys: ['uploadImage', 'uploadVideo', 'insertTable', 'insertLink', 'codeBlock', 'divider']
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
  };

  /**
   * 编辑器初始化完成事件
   */
  @Output() init: EventEmitter<IDomEditor> = new EventEmitter();


  /**
   * 编辑器实例
   */
  editor!: IDomEditor;

  /**
   * 编辑器默认配置，onCreated、onChange是固定的，外部传入的editorConf会合并到defEditorConf
   */
  defEditorConf: Partial<IEditorConfig> = {
    onCreated: (editor: IDomEditor) => {
      this.init.emit(editor);
    },
    onChange: (editor: IDomEditor) => {
      this.onModelChange(editor.getHtml());
    }
  };


  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.editorConf && changes.editorConf.firstChange) {
      this.defEditorConf = Object.assign(this.defEditorConf, changes.editorConf.currentValue);
    }
  }

  ngAfterViewInit(): void {
    this.editor = createEditor({
      selector: '#editor-container',
      html: this.html,
      config: this.defEditorConf,
    })

    createToolbar({
      editor: this.editor,
      selector: '#toolbar-container',
      config: this.toolbarConf,
    })
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
    if (!this.html) return;
    this.editor?.setHtml(this.html);
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }

}
