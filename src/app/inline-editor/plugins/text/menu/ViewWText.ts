import { Transforms } from "slate";
import { DomEditor, IButtonMenu, IDomEditor } from "@tuieditor/editor";
import { WTextElement } from "../types";

export class ViewWText implements IButtonMenu {

  title: string;
  iconSvg?: string | undefined;
  hotkey?: string | undefined;
  alwaysEnable?: boolean | undefined;
  tag: string;
  width?: number | undefined;

  constructor() {
    this.tag = 'button'
    this.title = '切换显示'
    this.iconSvg = '<svg t="1692338568443" class="icon" viewBox="0 0 1432 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10036" width="200" height="200"><path d="M712.62104428 907.5078125C363.29312257 907.5078125 159.15885416 507.98273522 159.15885416 512 159.15885416 520.91758185 363.29312257 116.4921875 712.62104428 116.4921875s553.46219012 390.27168688 553.4621909 395.5078125c0 0.41043283-204.12183076 395.5078125-553.4621909 395.5078125z m0-711.9140625C413.19178098 195.59375 238.22310452 519.12660274 238.22310452 512c0-3.20883676 174.96867646 316.40625 474.39793976 316.40625S1187.01898482 512.33580853 1187.01898482 512c0-4.19138786-174.96867646-316.40625-474.39794054-316.40625z m0 553.7109375c-131.00263524 0-237.19275106-106.2398656-237.19275106-237.3046875S581.61840981 274.6953125 712.62104428 274.6953125 949.82623298 380.9351781 949.82623298 512 843.62367952 749.3046875 712.62104428 749.3046875z m0-395.5078125A158.203125 158.203125 0 1 0 870.76198263 512 158.16581287 158.16581287 0 0 0 712.62104428 353.796875z" p-id="10037" fill="#000000"></path></svg>'
  }

  getValue(editor: IDomEditor): string | boolean {
    return ''
  }

  isActive(editor: IDomEditor): boolean {
    return false
  }

  isDisabled(editor: IDomEditor): boolean {
    if (!editor.selection) return true

    const elem = DomEditor.getSelectedNodeByType(editor, 'wText') as WTextElement
    if (!elem?.dataConf) return true

    return false
  }

  exec(editor: IDomEditor, value: string | boolean): void {
    const elem = DomEditor.getSelectedNodeByType(editor, 'wText') as WTextElement
    if (!elem) return
    const props: Partial<WTextElement> = { showMode: elem.showMode === 'number' ? 'placeholder' : 'number' }
    Transforms.setNodes(editor, props, {
      match: n => DomEditor.checkNodeType(n, 'wText')
    })
  }

}