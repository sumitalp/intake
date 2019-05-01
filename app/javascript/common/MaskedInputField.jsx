import FormField from 'common/FormField'
import MaskedInput from 'react-maskedinput'
import PropTypes from 'prop-types'
import React from 'react'

const findBreakPoints = (str, char) => {
  let currentGroupLength = 0
  const breakPoints = str.split(char).map((group) => {
    currentGroupLength += group.length
    return currentGroupLength
  })
  return breakPoints
}

const cursorPosition = (value, breakPoints) => {
  const matchNonNumericChars = /[^0-9]/g
  const valueOnlyNumbers = value.replace(matchNonNumericChars, '')
  const lengthOfValue = valueOnlyNumbers.length
  let currentBreakPoint = 0

  if (lengthOfValue) {
    breakPoints.forEach((breakPoint, index) => {
      if (lengthOfValue >= breakPoint) {
        currentBreakPoint = index + 1
      }
    })
  }

  return lengthOfValue + currentBreakPoint
}

const MaskedInputField = ({
  errors,
  gridClassName,
  id,
  label,
  labelClassName,
  mask,
  onBlur,
  onChange,
  onFocus,
  moveCursor,
  placeholder,
  required,
  type,
  value,
  onKeyPress,
}) => {
  const formFieldProps = {errors, gridClassName, htmlFor: id, label, labelClassName, required}
  const breakPoints = findBreakPoints(value, '-')
  const caret = cursorPosition(value, breakPoints)

  const handleKeyDown = (e) => {
    const leftArrowKey = 37
    const upArrowKey = 38
    const rightArrowKey = 39
    const downArrowKey = 40
    const enterKey = 13
    const arrowKeys = [leftArrowKey, upArrowKey, rightArrowKey, downArrowKey]
    const keyCode = e.keyCode
    if (arrowKeys.includes(keyCode)) {
      moveCursor(caret, e)
    } else if (keyCode === enterKey) {
      onKeyPress({charCode: enterKey})
    }
  }

  const handleBlur = (e) => {
    e.target.placeholder = ''
    if (onBlur) { onBlur() }
  }

  const handleClick = (e) => {
    moveCursor(caret, e)
  }

  return (
    <div className="masked-input-wrapper" onKeyDown={handleKeyDown} role="presentation">
      <FormField {...formFieldProps}>
        <MaskedInput
          className='masked-input'
          id={id}
          type={type}
          value={value}
          mask={mask}
          placeholder={''}
          required={required}
          aria-required={required}
          onBlur={handleBlur}
          onFocus={(e) => {
            e.target.placeholder = placeholder
            if (onFocus) { onFocus() }
            moveCursor(caret, e)
          }}
          onChange={onChange}
          onClick={handleClick}
          autoComplete={'off'}
        />
      </FormField>
    </div>
  )
}

MaskedInputField.defaultProps = {
  type: 'text',
  mask: '',
}

MaskedInputField.propTypes = {
  errors: PropTypes.array,
  gridClassName: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  labelClassName: PropTypes.string,
  mask: PropTypes.string,
  moveCursor: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onKeyPress: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}

export default MaskedInputField
