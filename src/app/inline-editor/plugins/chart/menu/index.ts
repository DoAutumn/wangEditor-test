import { insertChart } from "../helper"
import { InsertChart } from "./InsertChart"


export const ChartMenuConf = {
  key: 'insertChart',
  factory() {
    return new InsertChart()
  },
  config: {
    insertChart: insertChart
  }
}