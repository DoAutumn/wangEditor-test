export type EmptyText = {
  text: ''
}

export type DataConf = {
  dataConf: any        // 数据配置信息，编辑器不做解析，也不使用，由外部传递进来，存储到富文本中，当需要主动获取数据的时候，将其原样传递给外部
  resultFun: string    // 结果处理函数
  showField: string    // 显示结果中的哪个字段值
}

export type WTextStyle = {
  color: string
  backgroundColor: string
  fontSize: string
  fontWeight: string
  fontStyle: string
  fontFamily: string
}

export type WTextElement = {
  type: 'wText'
  id: string
  placeholder: string
  dataConf?: DataConf
  showMode: 'placeholder' | 'number'  // 当前显示的是占位符还是结果数值，只有dataConfig有值时才能显示结果数值
  style?: WTextStyle
  children: EmptyText[]
}