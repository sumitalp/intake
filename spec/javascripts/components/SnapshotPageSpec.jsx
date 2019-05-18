import React from 'react'
import {SnapshotPage, mapDispatchToProps} from 'snapshots/SnapshotPage'
import {clear, resetPersonSearch} from 'actions/peopleSearchActions'
import {shallow} from 'enzyme'
import * as IntakeConfig from 'common/config'

describe('SnapshotPage', () => {
  const renderSnapshotPage = ({participants = [], results = [], ...args}) => {
    const props = {participants, results, ...args}
    return shallow(<SnapshotPage {...props} />, {disableLifecycleMethods: true})
  }

  beforeEach(() => {
    spyOn(IntakeConfig, 'isFeatureInactive').and.returnValue(true)
    spyOn(IntakeConfig, 'isFeatureActive').and.returnValue(false)
  })

  it('renders PageHeader with title and start over button', () => {
    const snapshotPage = renderSnapshotPage({})
    const header = snapshotPage.find('Connect(PageHeader)')
    expect(header.exists()).toBe(true)
    expect(header.props().pageTitle).toEqual('Snapshot')
    expect(header.props().button.type).toEqual('button')
    expect(header.props().button.props.children).toEqual('Start Over')
  })

  it('renders a BreadCrumb with crumb', () => {
    const snapshotPage = renderSnapshotPage({})
    const breadCrumb = snapshotPage.find('Connect(BreadCrumb)')
    const crumb = breadCrumb.props().navigationElements
    expect(breadCrumb.exists()).toBe(true)
    expect(crumb.length).toBe(1)
    expect(crumb[0]).toBe('Snapshot')
  })

  it('renders person search', () => {
    const snapshotPage = renderSnapshotPage({})
    expect(snapshotPage.find('Connect(PersonSearchForm)').exists()).toBe(true)
    expect(snapshotPage.find('Connect(PersonSearchForm)').props().isClientOnly).toBe(true)
  })

  it('renders a PersonSearchResults if advanced search feature flag is on', () => {
    spyOn(IntakeConfig, 'isAdvancedSearchOn').and.returnValue(true)
    const results = [{fullName: 'Sarah Timson'}]
    const snapshotPage = renderSnapshotPage({results: results})
    const personSearchResults = snapshotPage.find('Connect(PersonSearchResults)')
    expect(personSearchResults.exists()).toEqual(true)
  })

  it('does not render a PersonSearchResults if advanced search feature flag is off', () => {
    spyOn(IntakeConfig, 'isAdvancedSearchOn').and.returnValue(false)
    const results = [{fullName: 'Sarah Timson'}]
    const snapshotPage = renderSnapshotPage({results: results})
    const personSearchResults = snapshotPage.find('Connect(PersonSearchResults)')
    expect(personSearchResults.exists()).toEqual(false)
  })

  it('does not render PersonSearchResults when there are no results', () => {
    const snapshotPage = renderSnapshotPage({results: []})
    expect(snapshotPage.find('Connect(PersonSearchResults)').exists()).toBeFalsy()
  })

  describe('mapDispatchToProps', () => {
    describe('starting over', () => {
      it('clears search results and criteria', () => {
        const dispatch = jasmine.createSpy('dispatch')
        const props = mapDispatchToProps(dispatch)
        props.startOver()
        expect(dispatch).toHaveBeenCalledWith(clear('results'))
        expect(dispatch).toHaveBeenCalledWith(resetPersonSearch())
      })
    })
  })
})
