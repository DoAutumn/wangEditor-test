import { Range } from "slate";
import { DomEditor, IButtonMenu, IDomEditor } from "@tuieditor/editor";
import { uuid } from "../../text/helper";

export class InsertChart implements IButtonMenu {

  title: string;
  iconSvg?: string | undefined;
  hotkey?: string | undefined;
  alwaysEnable?: boolean | undefined;
  tag: string;
  width?: number | undefined;

  constructor() {
    this.tag = 'button'
    this.title = '插入图表'
    this.iconSvg = '<svg t="1692257861864" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6185" width="200" height="200"><path d="M629.333333 160v768h-213.333333v-768h213.333333z m-277.333333 192v576h-213.333333v-576h213.333333z m554.666667 213.333333v362.666667h-213.333334v-362.666667h213.333334z m-341.333334-341.333333h-85.333333v640h85.333333v-640z m-277.333333 192h-85.333333v448h85.333333v-448z m554.666667 213.333333h-85.333334v234.666667h85.333334v-234.666667z" fill="#2c2c2c" p-id="6186"></path></svg>'
  }

  getValue(editor: IDomEditor): string | boolean {
    return ''
  }

  isActive(editor: IDomEditor): boolean {
    return false
  }

  isDisabled(editor: IDomEditor): boolean {
    const { selection } = editor
    if (selection == null) return true
    if (!Range.isCollapsed(selection)) return true // 选区非折叠，禁用

    const selectedElems = DomEditor.getSelectedElems(editor)
    const hasVoidOrPre = selectedElems.some(elem => {
      const type = DomEditor.getNodeType(elem)
      if (type === 'pre') return true
      if (type === 'list-item') return true
      if (editor.isVoid(elem)) return true
      return false
    })
    if (hasVoidOrPre) return true // void 或 pre ，禁用

    return false
  }

  exec(editor: IDomEditor, value: string | boolean): void {
    const { selectData } = editor.getMenuConfig('insertChart')
    if (selectData) selectData(uuid())
  }

}