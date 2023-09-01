import { DomEditor, IDomEditor, SlateTransforms } from "@tuieditor/editor";

export function withChart<T extends IDomEditor>(editor: T) {
  const { isInline, isVoid, normalizeNode } = editor
  const newEditor = editor

  // 如果为 true，则靠近 chart 触发换行操作时，都会导致图表重新渲染一次(触发 render 中的 hook)
  newEditor.isInline = elem => {
    const type = DomEditor.getNodeType(elem)
    if (type === 'chart') return false // 针对 type: chart ，设置为 inline
    return isInline(elem)
  }

  newEditor.isVoid = elem => {
    const type = DomEditor.getNodeType(elem)
    if (type === 'chart') return true // 针对 type: chart ，设置为 void
    return isVoid(elem)
  }

  newEditor.normalizeNode = ([node, path]) => {
    const type = DomEditor.getNodeType(node)
    if (type !== 'chart') return normalizeNode([node, path])

    // chart isInline = false，故后面必须跟一个 p header blockquote，否则后面无法继续输入文字
    const topLevelNodes = newEditor.children || []
    const nextNode: any = topLevelNodes[path[0] + 1] || {}
    const nextNodeType = DomEditor.getNodeType(nextNode)
    if (nextNodeType !== 'paragraph' && nextNodeType !== 'blockquote' && !nextNodeType.startsWith('header')) {
      const p = { type: 'paragraph', children: [{ text: '' }] }
      const insertPath = [path[0] + 1]
      SlateTransforms.insertNodes(newEditor, p, { at: insertPath })
    }
  }

  return newEditor // 返回 newEditor ，重要！！！
}