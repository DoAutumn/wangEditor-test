import { IModuleConf } from "@tuieditor/editor";
import { withChart } from "./plugin";
import { ChartRenderConf } from "./render";
import { ChartToHtmlConf } from "./elem-to-html";
import { HtmlToElemConf } from "./html-to-elem";
import { ChartMenuConf } from "./menu";

export const ChartModule: Partial<IModuleConf> = {
  editorPlugin: withChart,
  renderElems: [ChartRenderConf],
  elemsToHtml: [ChartToHtmlConf],
  parseElemsHtml: [HtmlToElemConf],
  menus: [ChartMenuConf]
}