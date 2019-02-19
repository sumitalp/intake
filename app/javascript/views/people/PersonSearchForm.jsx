import React from 'react'
import PropTypes from 'prop-types'
import Autocompleter from 'common/search/Autocompleter'
import {withRouter} from 'react-router'
import {PersonSearchFieldsPropType} from 'data/personSearch'

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
  counties: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    value: PropTypes.string,
  })),
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
  personSearchFields: PersonSearchFieldsPropType,
  results: PropTypes.array,
  staffId: PropTypes.string,
  states: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  total: PropTypes.number,
}

export {PersonSearchForm}

const PersonSearchFormWithRouter = withRouter(PersonSearchForm)
PersonSearchFormWithRouter.displayName = 'PersonSearchForm'
export default PersonSearchFormWithRouter
