import { SlateElement } from "@tuieditor/editor";
import { ChartElement } from "./types";
import { LZString } from "src/app/LZString";

function chartToHtml(elem: SlateElement, childrenHtml: string): string {
  const { id, chartName, dataConf, style = { width: '100%', height: '300px' } } = elem as ChartElement
  const dataConfString = dataConf ? LZString.compress(JSON.stringify(dataConf)) : ''
  return `<div data-w-e-type="chart" data-w-e-is-void data-id="${id}" data-chartName="${chartName}" data-width="${style.width}" data-height="${style.height}" data-dataConf="${dataConfString}">{{*chart${id}}}</div>`
}

export const ChartToHtmlConf = {
  type: 'chart',
  elemToHtml: chartToHtml
}