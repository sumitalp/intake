import React from 'react'
import {shallow} from 'enzyme'
import AgeUnitForm from 'common/search/age/AgeUnitForm'

const render = () => {
    const props = {
        formLabel: 'Unit',
        monthsLabel: 'Months',
        yearsLabel: 'Years',
    }

    return shallow(<AgeUnitForm {...props} />)
}

describe('AgeUnitForm', () => {
    describe('layout', () => {
        it('renders a label for the form', () => {
            const component = render()
            const formLabel = component.find('label[htmlFor="age-unit-form"]')
            expect(formLabel.exists()).toEqual(true)
            expect(formLabel.text()).toEqual('Unit')
        })

        it('renders a form with props', () => {
            const component = render()
            const form = component.find('form')
            expect(form.exists()).toBe(true)
            expect(form.props().className).toEqual('age-unit-form')
            expect(form.props().name).toEqual('age-unit-form')
        })

        it('renders two rows', () => {
            const component = render()
            const columns = component.find('div')
            expect(columns.length).toEqual(2)
        })

        describe('months', () => {
            it('renders a radio button with props', () => {
                const component = render()
                const radioButton = component.find('input#age-unit-months')
                expect(radioButton.exists()).toBe(true)
                expect(radioButton.props().type).toEqual('radio')
                expect(radioButton.props().name).toEqual('age-unit')
                expect(radioButton.props().id).toEqual('age-unit-months')
                expect(radioButton.props().value).toEqual('months')
            })

            it('renders a label for the radio button', () => {
                const component = render()
                const label = component.find('label[htmlFor="age-unit-months"]')
                expect(label.exists()).toEqual(true)
                expect(label.text()).toEqual('Months')
            })
        })

        describe('years', () => {
            it('renders a radio button with props', () => {
                const component = render()
                const radioButton = component.find('input#age-unit-years')
                expect(radioButton.exists()).toEqual(true)
                expect(radioButton.props().type).toEqual('radio')
                expect(radioButton.props().name).toEqual('age-unit')
                expect(radioButton.props().id).toEqual('age-unit-years')
                expect(radioButton.props().value).toEqual('years')
            })

            it('renders a label for the radio button', () => {
                const component = render()
                const label = component.find('label[htmlFor="age-unit-years"]')
                expect(label.exists()).toEqual(true)
                expect(label.text()).toEqual('Years')
            })
        })
    })
})