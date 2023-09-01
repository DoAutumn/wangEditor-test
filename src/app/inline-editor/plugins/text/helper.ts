import { IDomEditor } from "@tuieditor/editor"
import { DataConf, WTextElement } from "./types"

/**
 * 生成一个新的WTextElement
 * @param editor 
 * @param placeholder 占位符
 * @returns 
 */
export function getWTextNode(editor: IDomEditor, placeholder: string): WTextElement {
  const id = uuid(), newPlaceholder = autoNum(editor, placeholder)
  const wText: WTextElement = {
    type: 'wText',
    id: id,
    placeholder: `{{${newPlaceholder}}}`,
    showMode: 'placeholder',
    children: [{ text: '' }]
  }

  return wText
}

/**
 * 给占位符自动编号，防止重复
 */
function autoNum(editor: IDomEditor, placeholder: string) {
  const wTexts = Object.values(getWTexts(editor)).map((e: any) => e.placeholder.replace('{{', '').replace('}}', ''))

  placeholder = placeholder.match(/[a-zA-Z]+/)?.[0] || placeholder
  let index = 1
  wTexts.map(exist => {
    let number = Number(exist.replace(placeholder, ''))
    if (!isNaN(number) && number >= index) index = number + 1
  })
  return placeholder + index
}

/**
 * 对结果数据进行处理，如果有结果处理函数，则执行结果处理函数。
 * 如果是WText，则取用于显示的showField对应的值；如果是TChart，则直接返回
 * @param result 
 * @param dataConf 
 * @param type 
 */
export function parseData(result: any, dataConf: DataConf, type = 'WText') {
  const { resultFun, showField } = dataConf
  let newResult = result
  if (resultFun) {
    try {
      newResult = eval(resultFun)(result)
    } catch (error) {
      console.error('执行结果处理函数失败: ', error)
    }
  }
  if (type === 'WText') {
    return Array.isArray(newResult) ? newResult[0]?.[showField] : newResult?.[showField]
  }
  return newResult
}

/**
 * 获取所有WText
 * @param editor 
 * @returns 
 */
export function getWTexts(editor: IDomEditor) {
  const children = editor.children, mapping: any = {}
  children.filter((child: any) => child.type === 'paragraph').map((child: any) => {
    child.children.filter((e: any) => e.type === 'wText').map((e: any) => {
      mapping[e.id] = {
        id: e.id,
        placeholder: e.placeholder,
        dataConf: e.dataConf
      }
    })
  })
  return mapping
}


export function uuid(len = 16, radix = 16) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const uuid = []
  radix = radix || chars.length

  if (len) {
    for (let i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
  } else {
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        let r = 0 | Math.random() * 16
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }

  return uuid.join('')
}