import { DomEditor, IDomEditor, SlateElement } from "@tuieditor/editor";
import { VNode, h } from "snabbdom";
import { ChartElement } from "./types";

function renderChart(elem: SlateElement, children: VNode[] | null, editor: IDomEditor): VNode {
  const selected = DomEditor.isNodeSelected(editor, elem)
  const { id, style = { width: '100%', height: '300px' } } = elem as ChartElement

  const node = h(
    'div',
    {
      props: {
        id: id,
      },
      dataset: {
        selected: selected ? 'true' : '',
      },
      style: {
        width: style.width,
        height: style.height,
        background: '#ececec',
      },
      on: {
        mousedown: event => event.preventDefault(),
      },
      hook: {
        // dom 被插入到文档流时，创建图表实例
        insert: (vNode: VNode) => {
          const { createChart } = editor.getMenuConfig('insertChart')
          if (createChart) createChart(vNode.elm as HTMLElement, elem)
        }
      }
    }
  )

  return node
}

export const ChartRenderConf = {
  type: 'chart',
  renderElem: renderChart
}