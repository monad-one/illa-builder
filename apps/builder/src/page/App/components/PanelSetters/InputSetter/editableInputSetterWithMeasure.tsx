import { FC, useCallback, FocusEvent } from "react"
import { Input } from "@illa-design/input"
import {
  editableInputIconStyle,
  editableInputSetterStyle,
} from "@/page/App/components/PanelSetters/InputSetter/style"
import { EditableInputSetterProps } from "@/page/App/components/PanelSetters/InputSetter/interface"

const valueWithMeasureRegex = /^\d+(\.\d+)?(px|vh|vw|%|em|rem|cm|mm|in|pt|pc)$/

export const EditableInputWithMeasureSetter: FC<EditableInputSetterProps> = (
  props,
) => {
  const { value, handleUpdateDsl, attrName, icon } = props

  const fixInputValueWhenBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      let currentValue = e.target.value.toLocaleLowerCase().replace(/\s*/g, "")
      if (currentValue && !valueWithMeasureRegex.test(currentValue)) {
        const decimalArr = currentValue.match(/\d+(\.\d+)?/g)
        if (decimalArr) currentValue = decimalArr.join("") + "px"
      }
      handleUpdateDsl(attrName, currentValue)
    },
    [attrName, handleUpdateDsl],
  )

  return (
    <div css={editableInputSetterStyle}>
      {icon ? <div css={editableInputIconStyle}>{icon}</div> : null}
      <div style={{ width: "130px" }}>
        <Input
          withoutNormalBorder
          borderColor="techPurple"
          value={value}
          onChange={(value) => {
            handleUpdateDsl(attrName, value)
          }}
          onBlur={fixInputValueWhenBlur}
        />
      </div>
    </div>
  )
}
