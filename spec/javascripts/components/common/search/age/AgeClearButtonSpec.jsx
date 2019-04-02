import React from 'react'
import {shallow} from 'enzyme'
import AgeClearButton from 'common/search/age/AgeClearButton'

const render = ({onClear = () => {}}) => {
  return shallow(<AgeClearButton onClear={onClear} />)
}

describe('AgeClearButton', () => {
  describe('layout', () => {
    let component
    let wrapper

    beforeEach(() => {
      component = render({})
      wrapper = component.find('div.clear-age-wrapper')
    })

    it('renders a div', () => {
      expect(wrapper.exists()).toEqual(true)
    })

    it('renders text inside the wrapper', () => {
      expect(wrapper.text()).toEqual('Choose one: (clear)')
    })

    it('renders a span with props', () => {
      const button = wrapper.find('span.clear-age-button')
      expect(button.exists()).toEqual(true)
      expect(button.props().className).toEqual('clear-search-ui-age-fields-action clear-age-button')
      expect(button.props().role).toEqual('button')
      expect(button.props().tabIndex).toEqual('0')
      expect(typeof button.props().onKeyPress).toEqual('function')
      expect(typeof button.props().onClick).toEqual('function')
    })
  })

  describe('event handlers', () => {
    describe('clear age button', () => {
      describe('when the Enter key is pressed', () => {
        it('calls onClear', () => {
          const onClear = jasmine.createSpy('onClear')
          const button = render({onClear}).find('span.clear-age-button')
          button.simulate('keypress', {charCode: 13})
          expect(onClear).toHaveBeenCalledWith('age')
        })
      })

      describe('when the Enter key is not pressed', () => {
        it('does not call onClear', () => {
          const onClear = jasmine.createSpy('onClear')
          const button = render({onClear}).find('span.clear-age-button')
          button.simulate('keypress', {charCode: 0})
          expect(onClear).not.toHaveBeenCalled()
        })
      })

      describe('onClick', () => {
        it('calls onClear to clear age fields', () => {
          const onClear = jasmine.createSpy('onClear')
          const button = render({onClear}).find('span.clear-age-button')
          button.props().onClick()
          expect(onClear).toHaveBeenCalledWith('age')
        })
      })
    })
  })
})
