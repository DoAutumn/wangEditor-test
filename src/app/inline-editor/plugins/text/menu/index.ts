import { ConfWTextData } from "./ConfWTextData"
import { InsertWText } from "./InsertWText"
import { ViewWText } from "./ViewWText"

export const InsertWTextConf = {
  key: 'insertWText',
  factory() {
    return new InsertWText()
  }
}

export const ConfWTextDataConf = {
  key: 'confWTextData',
  factory() {
    return new ConfWTextData()
  }
}

export const ViewWTextConf = {
  key: 'viewWText',
  factory() {
    return new ViewWText
  }
}