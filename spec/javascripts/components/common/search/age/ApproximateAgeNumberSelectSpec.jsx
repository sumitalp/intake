import React from 'react'
import {shallow} from 'enzyme'
import ApproximateAgeNumberSelect from 'common/search/age/ApproximateAgeNumberSelect'

const render = ({
    id = 'search-approximate-age-number',
    gridClassName = 'age-number-field',
    onChange = () => {},
    value = '',
}) => {
    const props = {
        id,
        gridClassName,
        onChange,
        value,
    }

    return shallow(<ApproximateAgeNumberSelect {...props} />)
}

describe('ApproximateAgeNumberSelect', () => {
    describe('layout', () => {
        let component
        let numberSelect

        beforeEach(() => {
            component = render({})
            numberSelect = component.find('AgeNumberSelect')
        })

        it('renders AgeNumberSelect', () => {
            expect(numberSelect.exists()).toEqual(true)
        })

        it('sets props on AgeNumberSelect', () => {
            expect(numberSelect.props().id).toEqual('search-approximate-age-number')
            expect(numberSelect.props().gridClassName).toEqual('age-number-field')
            expect(typeof numberSelect.props().onChange).toEqual('function')
            expect(numberSelect.props().value).toEqual('')
        })
    })
})