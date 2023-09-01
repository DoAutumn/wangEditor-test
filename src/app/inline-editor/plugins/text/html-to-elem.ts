import { IDomEditor, SlateDescendant, SlateElement } from "@tuieditor/editor";
import { WTextElement } from './types';
import { LZString } from "src/app/LZString";

function htmlToElem(domElem: Element, children: SlateDescendant[], editor: IDomEditor): SlateElement {
  const id = domElem.getAttribute('data-id') || ''
  const placeholder = domElem.getAttribute('data-placeholder') || ''
  const dataConfString = domElem.getAttribute('data-dataConf') || ''

  const elem = {
    type: 'wText',
    id,
    placeholder,
    dataConf: dataConfString ? JSON.parse(LZString.decompress(dataConfString) || '') : null,
    showMode: 'placeholder',
    children: [{ text: '' }]
  } as WTextElement
  return elem
}

export const HtmlToElemConf = {
  selector: 'span[data-w-e-type="wText"]',
  parseElemHtml: htmlToElem
}