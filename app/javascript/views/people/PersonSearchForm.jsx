import React from 'react'
import PropTypes from 'prop-types'
import Autocompleter from 'common/search/Autocompleter'
import {withRouter} from 'react-router'

class PersonSearchForm extends React.Component {
  componentWillUnmount() {
    this.props.onCancel()
  }

  render() {
    return (
      <div className="card-height">
        <button
          className="anchor"
          aria-label="search-card-anchor"
          id="search-card-anchor"
        />
        <div className="card double-gap-bottom hidden-print search-card">
          <div className="card-header">
            <h2>Search</h2>
          </div>
          <div className={`card-body`}>
            <div className="row">
              <div className="col-md-12">
                <Autocompleter id="screening_participants" {...this.props} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

PersonSearchForm.propTypes = {
  canCreateNewPerson: PropTypes.bool.isRequired,
  isSelectable: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onLoadMoreResults: PropTypes.func,
  onSearch: PropTypes.func,
  onSelect: PropTypes.func,
  personSearchFields: PropTypes.shape({
    searchAddress: PropTypes.string,
    searchApproximateAge: PropTypes.string,
    searchApproximateAgeUnits: PropTypes.string,
    searchCity: PropTypes.string,
    searchClientId: PropTypes.string,
    searchCountry: PropTypes.string,
    searchCounty: PropTypes.string,
    searchDateOfBirth: PropTypes.string,
    searchFirstName: PropTypes.string,
    searchSexAtBirth: PropTypes.string,
    searchLastName: PropTypes.string,
    searchMiddleName: PropTypes.string,
    searchSsn: PropTypes.string,
    searchState: PropTypes.string,
    searchSuffix: PropTypes.string,
    searchTerm: PropTypes.string,
    searchZipCode: PropTypes.string,
  }),
  results: PropTypes.array,
  staffId: PropTypes.string,
  total: PropTypes.number,
}

export {PersonSearchForm}

const PersonSearchFormWithRouter = withRouter(PersonSearchForm)
PersonSearchFormWithRouter.displayName = 'PersonSearchForm'
export default PersonSearchFormWithRouter
