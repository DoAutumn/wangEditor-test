import { DataConf, EmptyText } from "../text/types"

export type ChartStyle = {
  width: string
  height: string
}

export type ChartElement = {
  type: 'chart'
  id: string
  chartName: string
  dataConf?: DataConf
  style?: ChartStyle
  children: EmptyText[]
}