import {mount} from 'enzyme'
import React from 'react'
import {createMockStore} from 'redux-test-utils'
import {fromJS} from 'immutable'
import StatesInjector from 'common/search/state/StatesInjector'

const MyComponent = () => <div>Hello World</div>
MyComponent.displayName = 'MyComponent'

describe('StatesInjector', () => {
  const render = (child, state) => {
    const store = createMockStore(state)
    const context = {store}
    return mount(<StatesInjector>{child}</StatesInjector>, {context})
  }

  describe('with states loaded', () => {
    const usStates = [
      {code: '231', value: 'California'},
      {code: '232', value: 'Nevada'},
      {code: '233', value: 'Oregon'},
      {code: '234', value: 'Washington'},
    ]
    const state = fromJS({systemCodes: {usStates}})

    it('renders the child element', () => {
      const component = render(<MyComponent />, state)
      expect(component.find('MyComponent').text()).toEqual('Hello World')
    })

    it('adds list of states to the child', () => {
      const component = render(<MyComponent />, state)
      expect(component.find('MyComponent').props().states).toEqual([
        {code: '231', value: 'California'},
        {code: '232', value: 'Nevada'},
        {code: '233', value: 'Oregon'},
        {code: '234', value: 'Washington'},
      ])
    })
  })

  describe('before states are loaded', () => {
    const state = fromJS({systemCodes: {usStates: []}})

    it('renders the child element', () => {
      const component = render(<MyComponent />, state)
      expect(component.find('MyComponent').text()).toEqual('Hello World')
    })

    it('adds an empty list of states to the child', () => {
      const component = render(<MyComponent />, state)
      expect(component.find('MyComponent').props().states).toEqual([])
    })
  })
})
