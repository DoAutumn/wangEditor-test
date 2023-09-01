import { IDomEditor, SlateElement } from "@tuieditor/editor";
import { VNode, h } from "snabbdom";
import { WTextElement } from "./types";

function renderWText(elem: SlateElement, children: VNode[] | null, editor: IDomEditor): VNode {
  const { id, placeholder, dataConf, style = { color: '#ff0000' } } = elem as WTextElement

  const node = h(
    'span',
    {
      props: {
        id: id,
      },
      style: style,
      on: {
        mousedown: event => event.preventDefault(),
      },
      hook: {
        // dom 被插入到文档流时，主动获取数据(如果需要)
        insert: (vNode: VNode) => {
          const dom = vNode.elm as HTMLElement
          dom.innerHTML = placeholder
          editor.getConfig().EXTEND_CONF.wTexts[id] = dom

          const { autoGetData = false, getData } = editor.getMenuConfig('confWTextData')
          dataConf && autoGetData && getData && getData(elem)
        }
      }
    }
  )

  return node
}

export const WTextRenderConf = {
  type: 'wText',
  renderElem: renderWText
}