import AttachLink from 'common/relationship/AttachLink'
import React from 'react'
import {shallow} from 'enzyme'
import {EmptyRelationships, Relationships} from 'common/Relationships'

describe('Relationships for Screening', () => {
  const getProps = (component, cardNumber) =>
    component
      .find('RelationCard')
      .at(cardNumber)
      .props()

  let onClick
  let component
  const relationshipsButtonStatus = {createRelationshipsButtonStatus: true}
  const renderRelationships = props =>
    shallow(
      <Relationships
        {...props}
        isScreening={true}
        screeningId={'1'}
        participants={['5pR7M2v0LL', 'DOXEzZN0LL']}
        pendingPeople={['1']}
        onClick={onClick}
        relationshipsButtonStatus={relationshipsButtonStatus}
      />,
      {disableLifecycleMethods: true}
    )

  const candidates = [
    {
      candidate: {
        age: '20',
        candidate_id: '123',
        dateOfBirth: '01/01/2001',
        gender: 'male',
        name: 'John Doe',
      },
      person: {
        age: '30',
        legacy_id: '12345',
        dateOfBirth: '02/02/2002',
        gender: 'male',
        name: 'Larry Doe',
      },
    },
  ]

  const people = [
    {
      id: 1,
      name: 'Sally Jones',
      relationships: [
        {
          type: 'mother',
          name: 'Kim Johnson',
          secondaryRelationship: 'mother',
          person_card_exists: true,
        },
      ],
    },
    {
      id: 2,
      name: 'Nate Starbringer',
      relationships: [
        {
          type: 'father',
          name: 'Jim Johnson',
          secondaryRelationship: 'father',
          person_card_exists: false,
        },
      ],
    },
    {
      id: 3,
      name: 'Jim Johnson',
      relationships: [
        {
          type: 'son',
          name: 'Nate Starbringer',
          secondaryRelationship: 'son',
          person_card_exists: true,
        },
        {
          type: 'son',
          name: 'Sally Jones',
          secondaryRelationship: 'son',
          person_card_exists: true,
        },
      ],
    },
    {
      id: 4,
      name: 'Cecilia Gomez',
      relationships: [
        {
          name: 'Jose Gomez',
          secondaryRelationship: 'son',
          person_card_exists: true,
          legacy_descriptor: {legacy_id: '1'},
        },
        {
          name: 'Julie Gomez',
          secondaryRelationship: 'daughter',
          person_card_exists: true,
        },
      ],
    },
    {
      id: 5,
      name: 'Nally Raymonds',
      relationships: [],
    },
    {
      id: 6,
      name: 'Kate Winslet',
      relationships: [],
    },
    {
      id: 7,
      name: 'Kim West',
      relationships: [],
    },
  ]

  beforeEach(() => {
    onClick = jasmine.createSpy('onClick')
    component = renderRelationships({people, candidates})
  })

  describe('ScreeningCreateRelationshipContainer', () => {
    it('render ScreeningCreateRelationshipContainer for each person', () => {
      expect(
        component.find('Connect(ScreeningCreateRelationship)').length
      ).toEqual(7)
    })
  })

  describe('Relationship for Relation Card Component', () => {
    it('renders a RelationCard component for each person with relationships', () => {
      expect(component.find('RelationCard').length).toEqual(4)
    })

    it('passes correct props to RelationCard component and card number', () => {
      expect(getProps(component, 0).person).toEqual({
        id: 1,
        name: 'Sally Jones',
        relationships: [
          {
            type: 'mother',
            name: 'Kim Johnson',
            secondaryRelationship: 'mother',
            person_card_exists: true,
          },
        ],
      })
      expect(getProps(component, 1).person).toEqual({
        id: 2,
        name: 'Nate Starbringer',
        relationships: [
          {
            type: 'father',
            name: 'Jim Johnson',
            secondaryRelationship: 'father',
            person_card_exists: false,
          },
        ],
      })
      expect(getProps(component, 2).person).toEqual({
        id: 3,
        name: 'Jim Johnson',
        relationships: [
          {
            type: 'son',
            name: 'Nate Starbringer',
            secondaryRelationship: 'son',
            person_card_exists: true,
          },
          {
            type: 'son',
            name: 'Sally Jones',
            secondaryRelationship: 'son',
            person_card_exists: true,
          },
        ],
      })
      expect(getProps(component, 3).person).toEqual({
        id: 4,
        name: 'Cecilia Gomez',
        relationships: [
          {
            name: 'Jose Gomez',
            secondaryRelationship: 'son',
            person_card_exists: true,
            legacy_descriptor: {legacy_id: '1'},
          },
          {
            name: 'Julie Gomez',
            secondaryRelationship: 'daughter',
            person_card_exists: true,
          },
        ],
      })
    })
  })

  it('renders people with no relationships', () => {
    expect(
      component
        .find('.no-relationships')
        .at(0)
        .text()
    ).toContain('Nally Raymonds has no known relationships')
    expect(
      component
        .find('.no-relationships')
        .at(1)
        .text()
    ).toContain('Kate Winslet has no known relationships')
    expect(
      component
        .find('.no-relationships')
        .at(2)
        .text()
    ).toContain('Kim West has no known relationships')
  })
})

describe('Relationships for Snapshot', () => {
  const onClick = jasmine.createSpy('onClick')
  const renderRelationships = props =>
    shallow(
      <Relationships {...props} isScreening={false} onClick={onClick} />,
      {disableLifecycleMethods: true}
    )

  it('renders people with no relationships', () => {
    const people = [
      {name: 'Sally Jones', relationships: []},
      {name: 'Nate Starbringer', relationships: []},
      {name: 'Jim Johnson', relationships: []},
    ]
    const component = renderRelationships({people})

    expect(
      component
        .find('.person')
        .at(0)
        .text()
    ).toEqual('Sally Jones')
    expect(
      component
        .find('.person')
        .at(1)
        .text()
    ).toEqual('Nate Starbringer')
    expect(
      component
        .find('.person')
        .at(2)
        .text()
    ).toEqual('Jim Johnson')
  })

  it('renders relationships for each person', () => {
    const participants = []
    const pendingPeople = []
    const people = [
      {
        name: 'Sally Jones',
        relationships: [
          {
            name: 'Jane Johnson',
            type: 'mother',
            person_card_exists: true,
            legacy_descriptor: {legacy_id: '1'},
          },
        ],
      },
      {
        name: 'Nate Starbringer',
        relationships: [
          {
            name: 'Jim Johnson',
            type: 'father',
            person_card_exists: false,
            legacy_descriptor: {legacy_id: '2'},
          },
        ],
      },
      {
        name: 'Jim Johnson',
        relationships: [
          {
            name: 'Nate Starbringer',
            type: 'son',
            person_card_exists: true,
            legacy_descriptor: {legacy_id: '4'},
          },
          {
            name: 'Sally Jones',
            type: 'daughter',
            person_card_exists: true,
            legacy_descriptor: {legacy_id: '3'},
          },
        ],
      },
    ]
    const component = renderRelationships({
      people,
      participants,
      pendingPeople,
    }).find(AttachLink)
    expect(component.length).toBe(4)
    expect(component.at(0).prop('relationship')).toEqual({
      name: 'Jane Johnson',
      type: 'mother',
      person_card_exists: true,
      legacy_descriptor: {legacy_id: '1'},
    })
    expect(component.at(1).prop('relationship')).toEqual({
      name: 'Jim Johnson',
      type: 'father',
      person_card_exists: false,
      legacy_descriptor: {legacy_id: '2'},
    })
    expect(component.at(2).prop('relationship')).toEqual({
      name: 'Nate Starbringer',
      type: 'son',
      person_card_exists: true,
      legacy_descriptor: {legacy_id: '4'},
    })
    expect(component.at(3).prop('relationship')).toEqual({
      name: 'Sally Jones',
      type: 'daughter',
      person_card_exists: true,
      legacy_descriptor: {legacy_id: '3'},
    })
  })

  it('renders relationships with sealed information flag when isSealed is true', () => {
    const participants = []
    const pendingPeople = []
    const people = [
      {
        name: 'Sally Jones',
        relationships: [
          {
            name: 'Jane Johnson',
            type: 'mother',
            person_card_exists: true,
            isSealed: true,
            legacy_descriptor: {legacy_id: '1'},
          },
        ],
      },
    ]
    const component = renderRelationships({
      people,
      participants,
      pendingPeople,
    })
    expect(
      component
        .find(AttachLink)
        .at(0)
        .prop('relationship')
    ).toEqual({
      name: 'Jane Johnson',
      type: 'mother',
      person_card_exists: true,
      isSealed: true,
      legacy_descriptor: {legacy_id: '1'},
    })
    expect(component.at(0).html()).toContain(
      '<span class="information-flag search-result">Sealed</span>'
    )
  })

  it('does not renders relationships with sealed information flag when isSealed is false', () => {
    const participants = []
    const pendingPeople = []
    const people = [
      {
        name: 'Sally Jones',
        relationships: [
          {
            name: 'Jane Johnson',
            type: 'mother',
            person_card_exists: true,
            isSealed: false,
            legacy_descriptor: {legacy_id: '1'},
          },
        ],
      },
    ]
    const component = renderRelationships({
      people,
      participants,
      pendingPeople,
    })

    expect(
      component
        .find(AttachLink)
        .at(0)
        .prop('relationship')
    ).toEqual({
      name: 'Jane Johnson',
      type: 'mother',
      person_card_exists: true,
      isSealed: false,
      legacy_descriptor: {legacy_id: '1'},
    })
    expect(component.at(0).html()).not.toContain(
      '<span class="information-flag search-result">Sealed</span>'
    )
  })

  it('renders relationships with sensitive information flag when isSensitive is true', () => {
    const participants = []
    const pendingPeople = []
    const people = [
      {
        name: 'Sally Jones',
        relationships: [
          {
            name: 'Jane Johnson',
            type: 'mother',
            person_card_exists: true,
            isSensitive: true,
            legacy_descriptor: {legacy_id: '1'},
          },
        ],
      },
    ]
    const component = renderRelationships({
      people,
      participants,
      pendingPeople,
    })

    expect(
      component
        .find(AttachLink)
        .at(0)
        .prop('relationship')
    ).toEqual({
      name: 'Jane Johnson',
      type: 'mother',
      person_card_exists: true,
      isSensitive: true,
      legacy_descriptor: {legacy_id: '1'},
    })
    expect(component.at(0).html()).toContain(
      '<span class="information-flag search-result">Sensitive</span>'
    )
  })

  it('does not renders relationships with sensitive information flag when isSensitive is false', () => {
    const participants = []
    const pendingPeople = []
    const people = [
      {
        name: 'Sally Jones',
        relationships: [
          {
            name: 'Jane Johnson',
            type: 'mother',
            person_card_exists: true,
            isSensitive: false,
            legacy_descriptor: {legacy_id: '1'},
          },
        ],
      },
    ]
    const component = renderRelationships({
      people,
      participants,
      pendingPeople,
    })

    expect(
      component
        .find(AttachLink)
        .at(0)
        .prop('relationship')
    ).toEqual({
      name: 'Jane Johnson',
      type: 'mother',
      person_card_exists: true,
      isSensitive: false,
      legacy_descriptor: {legacy_id: '1'},
    })
    expect(component.at(0).html()).not.toContain(
      '<span class="information-flag search-result">Sealed</span>'
    )
  })

  it('renders Age & Age_Units for each person', () => {
    const participants = []
    const pendingPeople = []
    const people = [
      {
        name: 'Sally Jones',
        relationships: [
          {
            name: 'Jane Johnson',
            type: 'mother',
            age: '(30 yrs)',
            person_card_exists: true,
            legacy_descriptor: {legacy_id: '1'},
          },
        ],
      },
      {
        name: 'Nate Starbringer',
        relationships: [
          {
            name: 'Jim Johnson',
            type: 'father',
            age: '(30 yrs)',
            person_card_exists: false,
            legacy_descriptor: {legacy_id: '2'},
          },
        ],
      },
      {
        name: 'Jim Johnson',
        relationships: [
          {
            name: 'Nate Starbringer',
            type: 'son',
            age: '(20 yrs)',
            person_card_exists: true,
            legacy_descriptor: {legacy_id: '4'},
          },
          {
            name: 'Sally Jones',
            type: 'daughter',
            age: '(10 yrs)',
            person_card_exists: true,
            legacy_descriptor: {legacy_id: '3'},
          },
        ],
      },
    ]
    const component = renderRelationships({
      people,
      participants,
      pendingPeople,
    }).find(AttachLink)

    expect(component.length).toBe(4)
    expect(component.at(0).prop('relationship')).toEqual({
      name: 'Jane Johnson',
      type: 'mother',
      age: '(30 yrs)',
      person_card_exists: true,
      legacy_descriptor: {legacy_id: '1'},
    })
    expect(component.at(1).prop('relationship')).toEqual({
      name: 'Jim Johnson',
      type: 'father',
      age: '(30 yrs)',
      person_card_exists: false,
      legacy_descriptor: {legacy_id: '2'},
    })
    expect(component.at(2).prop('relationship')).toEqual({
      name: 'Nate Starbringer',
      type: 'son',
      age: '(20 yrs)',
      person_card_exists: true,
      legacy_descriptor: {legacy_id: '4'},
    })
    expect(component.at(3).prop('relationship')).toEqual({
      name: 'Sally Jones',
      type: 'daughter',
      age: '(10 yrs)',
      person_card_exists: true,
      legacy_descriptor: {legacy_id: '3'},
    })
  })

  it('hides Attach link for people in the pending list', () => {
    const participants = []
    const pendingPeople = ['1']
    const people = [
      {
        name: 'Sally Jones',
        relationships: [
          {
            name: 'Jane Johnson',
            type: 'mother',
            person_card_exists: true,
            legacy_descriptor: {legacy_id: '1'},
          },
        ],
      },
      {
        name: 'Nate Starbringer',
        relationships: [
          {
            name: 'Jim Johnson',
            type: 'father',
            person_card_exists: true,
            legacy_descriptor: {legacy_id: '2'},
          },
        ],
      },
    ]
    const attachLinks = renderRelationships({
      people,
      participants,
      pendingPeople,
    }).find(AttachLink)

    expect(attachLinks.length).toBe(2)
    expect(attachLinks.at(0).prop('relationship')).toEqual({
      name: 'Jane Johnson',
      type: 'mother',
      person_card_exists: true,
      legacy_descriptor: {legacy_id: '1'},
    })
    expect(attachLinks.at(1).prop('relationship')).toEqual({
      name: 'Jim Johnson',
      type: 'father',
      person_card_exists: true,
      legacy_descriptor: {legacy_id: '2'},
    })
    expect(
      attachLinks
        .at(0)
        .dive()
        .find('a')
        .exists()
    ).toBe(false)
    expect(
      attachLinks
        .at(1)
        .dive()
        .find('a')
        .exists()
    ).toBe(true)
  })

  it('hides Attach link for people in the participants list', () => {
    const participants = ['2']
    const pendingPeople = []
    const people = [
      {
        name: 'Sally Jones',
        relationships: [
          {
            name: 'Jane Johnson',
            type: 'mother',
            person_card_exists: true,
            legacy_descriptor: {legacy_id: '1'},
          },
        ],
      },
      {
        name: 'Nate Starbringer',
        relationships: [
          {
            name: 'Jim Johnson',
            type: 'father',
            person_card_exists: true,
            legacy_descriptor: {legacy_id: '2'},
          },
        ],
      },
    ]

    const attachLinks = renderRelationships({
      people,
      participants,
      pendingPeople,
    }).find(AttachLink)

    expect(attachLinks.length).toBe(2)
    expect(attachLinks.at(0).prop('relationship')).toEqual({
      name: 'Jane Johnson',
      type: 'mother',
      person_card_exists: true,
      legacy_descriptor: {legacy_id: '1'},
    })
    expect(attachLinks.at(1).prop('relationship')).toEqual({
      name: 'Jim Johnson',
      type: 'father',
      person_card_exists: true,
      legacy_descriptor: {legacy_id: '2'},
    })
    expect(
      attachLinks
        .at(0)
        .dive()
        .find('a')
        .exists()
    ).toBe(true)
    expect(
      attachLinks
        .at(1)
        .dive()
        .find('a')
        .exists()
    ).toBe(false)
  })
})

describe('EmptyRelationships', () => {
  it('renders a reminder to add people when there are no relationships', () => {
    const component = shallow(<EmptyRelationships />, {
      disableLifecycleMethods: true,
    })
    expect(component.find('.empty-relationships').text()).toEqual(
      'Search for people and add them to see their relationships.'
    )
  })
})
