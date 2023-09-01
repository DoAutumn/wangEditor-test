import { DomEditor, IButtonMenu, IDomEditor } from "@tuieditor/editor";
import { WTextElement } from "../types";

export class ConfWTextData implements IButtonMenu {

  title: string;
  iconSvg?: string | undefined;
  hotkey?: string | undefined;
  alwaysEnable?: boolean | undefined;
  tag: string;
  width?: number | undefined;

  constructor() {
    this.tag = 'button'
    this.title = '配置数据源'
    this.iconSvg = '<svg t="1692337692072" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8529" width="200" height="200"><path d="M400 622.272c-118.912-7.264-220.544-37.504-280-79.712v81.408c0 55.488 121.056 101.568 280 110.4v55.904c-118.912-7.264-220.544-37.44-280-79.744v81.44H64V260C64 151.744 239.488 64 456 64c216.448 0 391.936 87.744 391.936 196v176.832h-56v-75.84c-68.576 56.896-193.408 94.976-335.968 94.976-142.56 0-267.36-38.08-336-94.976v94.976c0 55.488 121.088 101.6 280 110.432v55.872z m56 337.664c-216.512 0-392-75.2-392-168h56c0 61.888 150.4 112 336 112v56z m0-559.968c185.536 0 335.968-62.72 335.968-139.968 0-77.28-150.4-140-336-140-185.568 0-336 62.72-336 140 0 77.248 150.432 139.968 336 139.968z m487.264 367.36l-38.976-22.72c2.176-11.904 3.584-24.064 3.584-36.64a202.72 202.72 0 0 0-3.584-36.672l38.976-22.72c15.968-9.408 21.408-29.888 12.192-45.952l-33.28-58.176a33.152 33.152 0 0 0-45.568-12.32l-39.424 22.976a199.36 199.36 0 0 0-62.592-36.96v-28.576c0-18.528-14.88-33.6-33.312-33.6h-66.624a33.472 33.472 0 0 0-33.344 33.6v28.576a199.36 199.36 0 0 0-62.592 36.96l-39.424-22.976a33.152 33.152 0 0 0-45.536 12.32l-33.28 58.24a33.76 33.76 0 0 0 12.16 45.92l39.008 22.688c-2.304 12.064-3.52 24.352-3.584 36.672 0 12.576 1.376 24.736 3.584 36.672l-38.976 22.72c-16 9.376-21.44 29.856-12.224 45.92l33.312 58.176a33.152 33.152 0 0 0 45.536 12.32l39.424-22.944a198.784 198.784 0 0 0 62.592 36.96v28.544c0 18.56 14.912 33.6 33.344 33.6h66.624a33.472 33.472 0 0 0 33.312-33.6v-28.544a199.36 199.36 0 0 0 62.592-36.96l39.424 22.944a33.216 33.216 0 0 0 45.536-12.32l33.312-58.24a33.76 33.76 0 0 0-12.192-45.888z m-41.376 33.088l-15.36 26.144a15.52 15.52 0 0 1-20.992 5.472l-42.656-24.16a153.984 153.984 0 0 1-84.16 47.808v33.216c0 8.288-6.912 15.04-15.424 15.04h-30.688a15.232 15.232 0 0 1-15.36-15.104V855.68a153.984 153.984 0 0 1-84.192-47.808L550.4 832a15.52 15.52 0 0 1-21.024-5.472l-15.36-26.144a14.88 14.88 0 0 1 5.632-20.544l42.848-24.32a147.2 147.2 0 0 1-8.128-47.584c0-16.704 3.008-32.608 8.16-47.616l-42.88-24.32a14.88 14.88 0 0 1-5.6-20.512l15.36-26.176a15.52 15.52 0 0 1 20.992-5.472l42.656 24.192a153.984 153.984 0 0 1 84.16-47.808V527.04c0-8.32 6.88-15.04 15.392-15.04h30.72c8.48 0 15.36 6.72 15.36 15.104v33.152a153.984 153.984 0 0 1 84.16 47.808l42.688-24.192a15.52 15.52 0 0 1 20.992 5.472l15.36 26.176a14.88 14.88 0 0 1-5.6 20.544l-42.848 24.32c5.024 14.976 8.128 30.88 8.128 47.584 0 16.672-3.04 32.576-8.128 47.584l42.848 24.32a14.88 14.88 0 0 1 5.6 20.544z m-193.92-176.448a84 84 0 1 0 0 168 84 84 0 0 0 0-168z m0 112a28 28 0 1 1 0-56 28 28 0 0 1 0 56z" fill="#000000" p-id="8530"></path></svg>'
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
    const elem = DomEditor.getSelectedNodeByType(editor, 'wText') as WTextElement
    if (!elem) return

    const { selectData } = editor.getMenuConfig('confWTextData')
    if (selectData) selectData(elem.id)
  }

}