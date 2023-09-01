import { SlateElement } from "@tuieditor/editor";
import { WTextElement } from "./types";
import { LZString } from "src/app/LZString";

function wTextToHtml(elem: SlateElement, childrenHtml: string): string {
  const { id, placeholder, dataConf, style } = elem as WTextElement
  const dataConfString = dataConf ? LZString.compress(JSON.stringify(dataConf)) : ''
  return `<span data-w-e-type="wText" data-id="${id}" data-placeholder="${placeholder}" data-dataConf="${dataConfString}">${placeholder}</span>`
}

export const WTextToHtmlConf = {
  type: 'wText',
  elemToHtml: wTextToHtml
}