import React from 'react'
import PropTypes from 'prop-types'
import ShowField from 'common/ShowField'

const PhoneNumbersShow = ({phoneNumbers}) => {
  console.log(phoneNumbers)
  return (
    <div>
      {phoneNumbers.map(({number, type, extension, errors}, index) => (
        <div key={index}>
          <div className="row gap-top">
            <ShowField
              gridClassName="col-md-4"
              label="Phone Number"
              errors={errors}
            >
              {number}
            </ShowField>
            <ShowField gridClassName="col-md-4" label="Extension">
              {extension}
            </ShowField>
            <ShowField gridClassName="col-md-4" label="Phone Number Type">
              {type}
            </ShowField>
          </div>
        </div>
      ))}
    </div>
  )
}

PhoneNumbersShow.propTypes = {
  phoneNumbers: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.string,
      type: PropTypes.string,
      errors: PropTypes.array,
    })
  ),
}

export default PhoneNumbersShow
