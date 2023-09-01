import { Transforms } from "slate";
import { DomEditor, IDomEditor } from "@tuieditor/editor";
import { getWTextNode } from "./helper";


const regex = /{{.+?}}/g

function parseWText(editor: IDomEditor) {
  const { selection } = editor, newSelection: any = { anchor: { path: [], offset: 0 }, focus: { path: [], offset: 0 } }
  if (!selection) return

  // 选中最近的元素
  newSelection.anchor.path = selection.anchor.path
  newSelection.anchor.offset = 0
  newSelection.focus.path = selection.focus.path
  newSelection.focus.offset = selection.focus.offset
  editor.select(newSelection)

  // 得到文本字符串，按正则匹配，如果没有匹配到，则取消选中、插入一个空格(补充insertText处插入的空格)
  const text = editor.getSelectionText()
  if (!regex.test(text)) {
    editor.deselect()
    editor.focus()
    editor.insertFragment([{ text: ' ' }])
    return
  }
  const list = text.match(regex)
  if (!list || !list.length) return

  // 匹配到内容之后，只取最后一个，将其转换为WText
  const val = list[list.length - 1]
  const offset = text.indexOf(val), newSelection1 = JSON.parse(JSON.stringify(newSelection))
  newSelection1.anchor.offset = offset
  newSelection1.focus.offset = offset + val.length
  editor.select(newSelection1)  // 选中文本
  editor.deleteFragment()       // 删除选中的文本
  Transforms.insertNodes(editor, getWTextNode(editor, val.replace('{{', '').replace('}}', '')))  // 插入WText
  editor.insertFragment([{ text: ' ' }])
}


export function withWText<T extends IDomEditor>(editor: T) {
  const { isInline, isVoid, insertText, insertBreak } = editor
  const newEditor = editor

  newEditor.isInline = elem => {
    const type = DomEditor.getNodeType(elem)
    if (type === 'wText') return true
    return isInline(elem)
  }

  newEditor.isVoid = elem => {
    const type = DomEditor.getNodeType(elem)
    if (type === 'wText') return true
    return isVoid(elem)
  }

  // 输入空格时，尝试从已输入的内容中解析出WText
  newEditor.insertText = t => {
    if (t === ' ') {
      parseWText(newEditor)
      return
    }
    insertText(t)
  }

  newEditor.insertBreak = () => {
    insertBreak()
  }

  return newEditor
}