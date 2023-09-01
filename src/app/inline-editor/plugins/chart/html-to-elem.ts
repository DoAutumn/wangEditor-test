import { IDomEditor, SlateDescendant, SlateElement } from "@tuieditor/editor";
import { ChartElement } from "./types";
import { LZString } from "src/app/LZString";

function htmlToElem(domElem: Element, children: SlateDescendant[], editor: IDomEditor): SlateElement {
  const id = domElem.getAttribute('data-id') || ''
  const chartName = domElem.getAttribute('data-chartName') || ''
  const dataConfString = domElem.getAttribute('data-dataConf') || ''
  const width = domElem.getAttribute('data-width') || '100%'
  const height = domElem.getAttribute('data-height') || '300px'
  const elem = {
    type: 'chart',
    id,
    chartName,
    dataConf: dataConfString ? JSON.parse(LZString.decompress(dataConfString) || '') : null,
    style: { width: width, height: height },
    children: [{ text: '' }]
  } as ChartElement
  return elem
}

export const HtmlToElemConf = {
  selector: 'div[data-w-e-type="chart"]',
  parseElemHtml: htmlToElem
}