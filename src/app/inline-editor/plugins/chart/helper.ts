import { Transforms } from "slate";
import { IDomEditor } from "@tuieditor/editor";
import { ChartElement, ChartStyle } from "./types";

/**
 * 选择一个指标(图表)之后，创建图表数据对象
 * @param editor 
 * @param id 
 * @param chartName 
 * @param style 
 */
export function insertChart(editor: IDomEditor, id: string, chartName: string, dataConf: any, style: ChartStyle = { width: '100%', height: '300px' }) {
  editor.restoreSelection()

  const chart: ChartElement = {
    type: 'chart',
    id,
    chartName,
    dataConf,
    style,
    children: [{ text: '' }]
  }
  Transforms.insertNodes(editor, chart)
}