import React from 'react'
import PropTypes from 'prop-types'
import Autocompleter from 'common/search/Autocompleter'
import {withRouter} from 'react-router'
import {PersonSearchFieldsPropType} from 'data/personSearch'
import {isAdvancedSearchOn} from 'common/config'

class PersonSearchForm extends React.Component {
  componentWillUnmount() {
    this.props.onCancel()
  }

  render() {
    const {searchPrompt, location, ...autocompleterProps} = this.props
    const advancedSearchFeatureFlag = isAdvancedSearchOn(location)
    const classNameAdvancedSearchDisabled = advancedSearchFeatureFlag ? 'advanced-search-enabled' : 'advanced-search-disabled'

    return (
      <div className="card-height">
        <button className="anchor" aria-label="search-card-anchor" id="search-card-anchor" />
        <div id='search-card' className="card double-gap-bottom hidden-print person-search-card">
          <div className="card-header">
            <h2>Snapshot Search</h2>
          </div>
          <div className={`card-body ${classNameAdvancedSearchDisabled}`}>
            <div className="row">
              <div className="col-md-12">
                {!advancedSearchFeatureFlag && <label className='pull-left autocompleter-label' htmlFor='screening_participants'>{searchPrompt}</label>}
                <Autocompleter id="screening_participants" {...autocompleterProps} isAdvancedSearchOn={advancedSearchFeatureFlag} />
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
  onBlur: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onLoadMoreResults: PropTypes.func,
  onSearch: PropTypes.func,
  onSelect: PropTypes.func,
  personSearchFields: PersonSearchFieldsPropType,
  results: PropTypes.array,
  searchPrompt: PropTypes.string.isRequired,
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
