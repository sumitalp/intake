import {combineCompact} from 'utils/validator'

const VALID_CLIENT_ID_LENGTH = 19

const validateClientIdLength = (clientIdWithoutHyphens) => (
  (clientIdWithoutHyphens.length > 0 && clientIdWithoutHyphens.length < VALID_CLIENT_ID_LENGTH) ?
    'Client Id number must be 19 digits long.' : undefined
)

export const getClientIdErrors = (clientIdWithoutHyphens) => combineCompact(() => validateClientIdLength(clientIdWithoutHyphens))
