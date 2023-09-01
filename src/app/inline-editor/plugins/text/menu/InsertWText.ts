import { IButtonMenu, IDomEditor } from "@tuieditor/editor";
import { getWTextNode } from "../helper";



export class InsertWText implements IButtonMenu {

  title: string;
  iconSvg?: string | undefined;
  hotkey?: string | undefined;
  alwaysEnable?: boolean | undefined;
  tag: string;
  width?: number | undefined;

  constructor() {
    this.tag = 'button'
    this.title = '插入占位符'
    this.iconSvg = '<svg t="1692328788932" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7466" width="200" height="200"><path d="M947.2 1024h-153.6v-51.2h153.6V51.2h-153.6V0h204.8v1024h-51.2zM606.9248 505.4464l228.0448 402.3808h-186.2144l-132.0448-264.8064a238.7968 238.7968 0 0 1-14.7456-52.0192h-1.8944a386.304 386.304 0 0 1-17.1008 53.6064l-132.5056 263.2704H162.816l236.0832-399.36-215.6544-398.7968h190.976l109.7216 244.224A437.0944 437.0944 0 0 1 506.88 419.84h1.8944q9.984-32.4608 24.2176-68.5056l121.1392-241.6128H829.44zM76.8 972.8h153.6v51.2H25.6V0h204.8v51.2H76.8v921.6z" fill="#000000" p-id="7467"></path></svg>'
  }

  getValue(editor: IDomEditor): string | boolean {
    return ''
  }

  isActive(editor: IDomEditor): boolean {
    return false
  }

  isDisabled(editor: IDomEditor): boolean {
    return false
  }

  exec(editor: IDomEditor, value: string | boolean): void {
    editor.insertFragment([{ text: ' ' }])
    editor.insertNode(getWTextNode(editor, 'text'))
    // 这里不能使用 Transforms.insertNodes，否则在一段纯文本中间插入时，总是会插入到开头位置，不清楚是什么问题，很奇怪，插入链接也是用的它，但是却没有问题
    // Transforms.insertNodes(editor, getWTextNode('text'))
    editor.insertFragment([{ text: ' ' }])
  }

}