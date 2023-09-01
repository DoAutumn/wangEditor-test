import { IModuleConf } from "@tuieditor/editor";
import { WTextToHtmlConf } from "./elem-to-html";
import { InsertWTextConf, ConfWTextDataConf, ViewWTextConf } from "./menu";
import { withWText } from "./plugin";
import { WTextRenderConf } from "./render";
import { HtmlToElemConf } from "./html-to-elem";

export const WTextModule: Partial<IModuleConf> = {
  editorPlugin: withWText,
  renderElems: [WTextRenderConf],
  elemsToHtml: [WTextToHtmlConf],
  parseElemsHtml: [HtmlToElemConf],
  menus: [InsertWTextConf, ConfWTextDataConf, ViewWTextConf]
}