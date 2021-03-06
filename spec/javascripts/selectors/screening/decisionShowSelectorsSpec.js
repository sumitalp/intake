import {fromJS, List} from 'immutable'
import {
  getDecisionSelector,
  getDecisionDetailSelector,
  getErrorsSelector,
  getRestrictionRationaleSelector,
  getAdditionalInfoRequiredSelector,
  getAdditionalInformationSelector,
  selectContactReference,
} from 'selectors/screening/decisionShowSelectors'
import * as matchers from 'jasmine-immutable-matchers'

describe('decisionShowSelectors', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  describe('getDecisionSelector', () => {
    it('returns the human-readable value of the screening decision', () => {
      const screening = {screening_decision: 'screen_out'}
      const state = fromJS({screening})
      expect(getDecisionSelector(state).get('value')).toEqual('Screen out')
    })

    it('returns errors for screening decision', () => {
      const screening = {screening_decision: 'screen_out'}
      const state = fromJS({screening})
      expect(getDecisionSelector(state).get('errors')).toEqualImmutable(List())
    })
  })

  describe('getDecisionDetailSelector', () => {
    it('returns the value for decision detail as a raw value', () => {
      const screening = {
        screening_decision: 'promote_to_referral',
        screening_decision_detail: '3_days',
      }
      const state = fromJS({screening})
      expect(getDecisionDetailSelector(state).get('value')).toEqual('3 days')
    })

    it('returns the human-readable value for decision detail as an enum', () => {
      const screening = {
        screening_decision: 'differential_response',
        screening_decision_detail: 'Provide info on service',
      }
      const state = fromJS({screening})
      expect(getDecisionDetailSelector(state).get('value')).toEqual('Provide info on service')
    })

    it('returns errors for decision detail', () => {
      const screening = {
        screening_decision: 'screen_out',
        screening_decision_detai: '',
      }
      const state = fromJS({screening})
      expect(getDecisionDetailSelector(state).get('errors')).toEqualImmutable(List())
    })

    it('returns a label for the field', () => {
      const screening = {
        screening_decision: 'promote_to_referral',
        screening_decision_detai: '',
      }
      const state = fromJS({screening})
      expect(getDecisionDetailSelector(state).get('label')).toEqual('Response Time')
    })

    it('returns an empty label if screening_decision is empty', () => {
      const screening = {
        screening_decision: '',
        screening_decision_detai: '',
      }
      const state = fromJS({screening})
      expect(getDecisionDetailSelector(state).get('label')).toEqual('')
    })

    it('is required if screening decision is promote_to_referral', () => {
      const screening = {
        screening_decision: 'promote_to_referral',
        screening_decision_detai: '',
      }
      const state = fromJS({screening})
      expect(getDecisionDetailSelector(state).get('required')).toEqual(true)
    })

    it('is not required if screening decision is not promote_to_referral', () => {
      const screening = {
        screening_decision: 'differential_response',
        screening_decision_detai: '',
      }
      const state = fromJS({screening})
      expect(getDecisionDetailSelector(state).get('required')).toEqual(false)
    })
  })

  describe('getErrorsSelector', () => {
    describe('screening decision', () => {
      it('includes an error message if screening decision is empty', () => {
        const screening = {}
        const state = fromJS({screening})
        expect(getErrorsSelector(state).get('screening_decision'))
          .toEqualImmutable(List(['Please enter a decision']))
      })

      it('does not include an error message if screening decision is present', () => {
        const screening = {screening_decision: 'screen_out'}
        const state = fromJS({screening})
        expect(getErrorsSelector(state).get('screening_decision'))
          .toEqualImmutable(List())
      })

      it('includes an error message if decision is information to child welfare service and role is empty', () => {
        const screening = {screening_decision: 'information_to_child_welfare_services'}
        const participants = [{id: '1', roles: []}]
        const state = fromJS({screening, participants})
        expect(getErrorsSelector(state).get('screening_decision'))
          .toEqualImmutable(List(['A reporter is required to submit a screening Contact']))
      })

      it('includes an error message if decision is information to child welfare service and role is not reporter', () => {
        const screening = {screening_decision: 'information_to_child_welfare_services'}
        const participants = [{id: '1', roles: ['Victim', 'Perpetrator']}]
        const state = fromJS({screening, participants})
        expect(getErrorsSelector(state).get('screening_decision'))
          .toEqualImmutable(List(['A reporter is required to submit a screening Contact']))
      })

      it('does not include an error message if decision is information to child welfare service and role is reporter', () => {
        const screening = {screening_decision: 'information_to_child_welfare_services'}
        const participants = [{id: '1', roles: ['Mandated Reporter', 'Victim']}]
        const state = fromJS({screening, participants})
        expect(getErrorsSelector(state).get('screening_decision'))
          .toEqualImmutable(List())
      })

      it('includes an error message if decision is promote to referral and allegations are empty', () => {
        const screening = {screening_decision: 'promote_to_referral'}
        const allegationsForm = [{allegationTypes: []}]
        const participants = [{roles: ['Anonymous Reporter']}]
        const state = fromJS({screening, allegationsForm, participants})
        expect(getErrorsSelector(state).get('screening_decision'))
          .toEqualImmutable(List(['Please enter at least one allegation to promote to referral.']))
      })

      it('includes an error message if decision is promote to referral and there is no reporter', () => {
        const screening = {screening_decision: 'promote_to_referral'}
        const allegationsForm = [{allegationTypes: ['General Neglect']}]
        const participants = [{roles: ['Perpetrator']}]
        const state = fromJS({screening, allegationsForm, participants})
        expect(getErrorsSelector(state).get('screening_decision'))
          .toEqualImmutable(List(['A reporter is required to promote to referral']))
      })

      it('does not include an error message if decision is promote to referral and allegations and reporter are present', () => {
        const screening = {screening_decision: 'promote_to_referral'}
        const allegationsForm = [{allegationTypes: ['General neglect']}]
        const participants = [{roles: ['Anonymous Reporter']}]
        const state = fromJS({screening, allegationsForm, participants})
        expect(getErrorsSelector(state).get('screening_decision'))
          .toEqualImmutable(List())
      })

      it('includes an error message if decision is not promote to referral, even if allegations are empty', () => {
        const screening = {screening_decision: 'screen_out'}
        const allegationsForm = [{allegationTypes: []}]
        const state = fromJS({screening, allegationsForm})
        expect(getErrorsSelector(state).get('screening_decision'))
          .toEqualImmutable(List())
      })
    })

    describe('screening decision detail', () => {
      it('includes an error message if decision is promote to referral and no detail is present', () => {
        const screening = {screening_decision: 'promote_to_referral'}
        const state = fromJS({screening})
        expect(getErrorsSelector(state).get('screening_decision_detail'))
          .toEqualImmutable(List(['Please enter a response time']))
      })

      it('does not include an error message if decision is promote to referral and detail is present', () => {
        const screening = {screening_decision: 'promote_to_referral', screening_decision_detail: '3_days'}
        const state = fromJS({screening})
        expect(getErrorsSelector(state).get('screening_decision_detail'))
          .toEqualImmutable(List())
      })

      it('does not include an error message if decision is not promote to referral, even when detail is empty', () => {
        const screening = {screening_decision: 'screen_out'}
        const state = fromJS({screening})
        expect(getErrorsSelector(state).get('screening_decision_detail'))
          .toEqualImmutable(List())
      })
    })

    describe('additional information', () => {
      it('includes an error message if decision is screen out and decision detail is evaluate out', () => {
        const screening = {screening_decision: 'screen_out', screening_decision_detail: 'evaluate_out'}
        const state = fromJS({screening})
        expect(getErrorsSelector(state).get('additional_information'))
          .toEqualImmutable(List(['Please enter additional information']))
      })

      it('does not include an error message if decision is screen out and decision detail is anything other than evaluate out', () => {
        const screening = {screening_decision: 'screen_out', screening_decision_detail: 'consultation'}
        const state = fromJS({screening})
        expect(getErrorsSelector(state).get('additional_information'))
          .toEqualImmutable(List())
      })

      it('does not include an error message if decision is screen out, and decision detail is empty', () => {
        const screening = {screening_decision: 'screen_out'}
        const state = fromJS({screening})
        expect(getErrorsSelector(state).get('additional_information'))
          .toEqualImmutable(List())
      })

      it('does not include an error message if decision is not screen out', () => {
        const screening = {screening_decision: 'not screen_out'}
        const state = fromJS({screening})
        expect(getErrorsSelector(state).get('additional_information'))
          .toEqualImmutable(List())
      })
    })

    describe('restrictions rationale', () => {
      it('returns an error if there is no rationale and access_restrictions is sensitive', () => {
        const screening = {access_restrictions: 'sensitive'}
        const state = fromJS({screening})
        expect(getErrorsSelector(state).get('restrictions_rationale'))
          .toEqualImmutable(List(['Please enter an access restriction reason']))
      })

      it('returns no error if access_restrictions is null', () => {
        const screening = {access_restrictions: null}
        const state = fromJS({screening})
        expect(getErrorsSelector(state).get('restrictions_rationale'))
          .toEqualImmutable(List())
      })
    })
  })

  describe('getAdditionalInfoRequiredSelector', () => {
    it('returns true if screening decision is screen_out and screening_decision_detail is evaluate_out', () => {
      const screening = {screening_decision: 'screen_out', screening_decision_detail: 'evaluate_out'}
      const state = fromJS({screening})
      expect(getAdditionalInfoRequiredSelector(state)).toEqualImmutable(fromJS(true))
    })

    it('returns false if screening decision is screen_out and screening_decision_detail is not evaluate_out', () => {
      const screening = {screening_decision: 'screen_out', screening_decision_detail: 'not evaluate_out'}
      const state = fromJS({screening})
      expect(getAdditionalInfoRequiredSelector(state)).toEqualImmutable(fromJS(false))
    })

    it('returns false if screening decision is not screen_out', () => {
      const screening = {screening_decision: 'not screen_out', screening_decision_detail: 'Immediate'}
      const state = fromJS({screening})
      expect(getAdditionalInfoRequiredSelector(state)).toEqualImmutable(fromJS(false))
    })
  })

  describe('selectContactReference', () => {
    it('returns the value of the field', () => {
      const screening = {screening_contact_reference: '111-222'}
      const state = fromJS({screening})
      expect(selectContactReference(state).get('value')).toEqual('111-222')
    })

    it('returns empty if the value of the field is null', () => {
      const screening = {screening_contact_reference: null}
      const state = fromJS({screening})
      expect(selectContactReference(state).get('value')).toEqual('')
    })

    it('returns an error if the value is not a valid case or referral id', () => {
      const screening = {
        screening_contact_reference: '0442',
        screening_decision: 'information_to_child_welfare_services',
      }
      const involvements = {
        referrals: [{
          start_date: '01/01/2014',
          legacy_descriptor: {
            legacy_ui_id: '0442-2654-1834-4001650',
          },
        }],
        cases: [{
          start_date: '01/01/2014',
          end_date: '02/02/2014',
        }],
      }
      const state = fromJS({screening, involvements})
      expect(selectContactReference(state).get('errors')).toEqual(List(['Please enter a valid Case or Referral Id']))
    })
  })

  describe('getRestrictionRationaleSelector', () => {
    it('returns the proper value if one exists', () => {
      const screening = {restrictions_rationale: 'ABC'}
      const state = fromJS({screening})
      expect(getRestrictionRationaleSelector(state).get('value')).toEqual('ABC')
    })

    it('returns an empty string if current value is null', () => {
      const screening = {restrictions_rationale: null}
      const state = fromJS({screening})
      expect(getRestrictionRationaleSelector(state).get('value')).toEqual('')
    })

    it('returns no error if access_restrictions is null and if restrictions_rationale is null', () => {
      const screening = {access_restrictions: null, restrictions_rationale: null}
      const state = fromJS({screening})
      expect(getRestrictionRationaleSelector(state).get('errors')).toEqualImmutable(List())
    })

    it('returns error if access_restrictions is sealed and if restrictions_rationale is null', () => {
      const screening = {access_restrictions: 'sealed', restrictions_rationale: null}
      const state = fromJS({screening})
      expect(getRestrictionRationaleSelector(state).get('errors')).toEqualImmutable(List(['Please enter an access restriction reason']))
    })

    it('returns no error if access_restrictions is sealed and if restrictions_rationale is not null', () => {
      const screening = {access_restrictions: 'sealed', restrictions_rationale: 'My access restriction reason'}
      const state = fromJS({screening})
      expect(getRestrictionRationaleSelector(state).get('errors')).toEqualImmutable(List())
    })

    it('returns error if access_restrictions is sensitive and if restrictions_rationale is null', () => {
      const screening = {access_restrictions: 'sensitive', restrictions_rationale: null}
      const state = fromJS({screening})
      expect(getRestrictionRationaleSelector(state).get('errors')).toEqualImmutable(List(['Please enter an access restriction reason']))
    })

    it('returns no error if access_restrictions is sensitive and if restrictions_rationale is not null', () => {
      const screening = {access_restrictions: 'sensitive', restrictions_rationale: 'My access restriction reason'}
      const state = fromJS({screening})
      expect(getRestrictionRationaleSelector(state).get('errors')).toEqualImmutable(List())
    })
  })

  describe('getAdditionalInformationSelector', () => {
    it('returns errors for screening decision', () => {
      const screening = {additional_information: 'additional_information'}
      const state = fromJS({screening})
      expect(getAdditionalInformationSelector(state).get('errors')).toEqualImmutable(List())
    })

    it('returns the proper value if one exists', () => {
      const screening = {additional_information: 'ABC'}
      const state = fromJS({screening})
      expect(getAdditionalInformationSelector(state).get('value')).toEqual('ABC')
    })

    it('returns an empty string if current value is null', () => {
      const screening = {additional_information: null}
      const state = fromJS({screening})
      expect(getAdditionalInformationSelector(state).get('value')).toEqual('')
    })

    it('returns error if screening_decision is screen_out, screening_decision_detail is evaluate_out and additional_information is null', () => {
      const screening = {screening_decision: 'screen_out', screening_decision_detail: 'evaluate_out', additional_information: null}
      const state = fromJS({screening})
      expect(getAdditionalInformationSelector(state).get('errors')).toEqualImmutable(List(['Please enter additional information']))
    })

    it('returns error if screening_decision is screen_out, screening_decision_detail is evaluate_out and additional_information is not null', () => {
      const screening = {screening_decision: 'screen_out', screening_decision_detail: 'evaluate_out', additional_information: 'My additional information'}
      const state = fromJS({screening})
      expect(getAdditionalInformationSelector(state).get('errors')).toEqualImmutable(List())
    })

    it('returns error if screening_decision is screen_out, screening_decision_detail is not evaluate_out and additional_information is null', () => {
      const screening = {screening_decision: 'screen_out', screening_decision_detail: 'not evaluate_out', additional_information: null}
      const state = fromJS({screening})
      expect(getAdditionalInformationSelector(state).get('errors')).toEqualImmutable(List())
    })
  })
})
