import React from 'react'
import {shallow} from 'enzyme'
import MaskedSearchInput from 'common/search/MaskedSearchInput'

const render = (
  {
    errors = [],
    label = 'label',
    mask = '',
    name = 'name',
    onBlur = () => {},
    onChange = () => {},
    onFocus = () => {},
    onKeyPress = () => {},
    value = '',
  } = {}
) =>
  shallow(
    <MaskedSearchInput
      errors={errors}
      label={label}
      mask={mask}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      onKeyPress={onKeyPress}
      value={value}
    />
  )

describe('MaskedSearchInput', () => {
  describe('layout', () => {
    it('renders the HyphenatedMaskedInput', () => {
      const component = render({})
      const hyphenatedMaskedInput = component.find('HyphenatedMaskedInput')
      expect(hyphenatedMaskedInput.exists()).toEqual(true)
    })

    it('sets the correct props on HyphenatedMaskedInput', () => {
      const component = render({name: 'clientId'})
      const hyphenatedMaskedInput = component.find('HyphenatedMaskedInput')
      const props = hyphenatedMaskedInput.props()
      expect(props.errors).toEqual([])
      expect(props.id).toEqual('masked-input-clientId')
      expect(props.gridClassName).toEqual('col-md-3 clientId-field')
      expect(props.label).toEqual('label')
      expect(props.mask).toEqual('')
      expect(typeof props.onBlur).toEqual('function')
      expect(typeof props.onChange).toEqual('function')
      expect(typeof props.onFocus).toEqual('function')
      expect(typeof props.onKeyPress).toEqual('function')
      expect(props.value).toEqual('')
    })
  })

  describe('when the input value changes', () => {
    it('calls onChange when a new value is entered', () => {
      const onChange = jasmine.createSpy('onChange')
      const component = render({name: 'clientId', onChange})
      const hyphenatedMaskedInput = component.find('HyphenatedMaskedInput')
      hyphenatedMaskedInput.props().onChange({target: {value: '1'}})
      expect(onChange).toHaveBeenCalledWith('clientId', '1')
    })
  })

  describe('when input is blurred', () => {
    it('calls onBlur to set field error check to true', () => {
      const onBlur = jasmine.createSpy('onBlur')
      const component = render({name: 'clientId', onBlur})
      const hyphenatedMaskedInput = component.find('HyphenatedMaskedInput')
      hyphenatedMaskedInput.props().onBlur()
      expect(onBlur).toHaveBeenCalledWith('clientId')
    })
  })

  describe('when input has focus', () => {
    it('calls onFocus to set field error check to false', () => {
      const onFocus = jasmine.createSpy('onFocus')
      const component = render({name: 'clientId', onFocus})
      const hyphenatedMaskedInput = component.find('HyphenatedMaskedInput')
      hyphenatedMaskedInput.props().onFocus()
      expect(onFocus).toHaveBeenCalledWith('clientId')
    })
  })
})
